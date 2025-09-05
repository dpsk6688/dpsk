from flask import Blueprint, request, jsonify
from src.models.progress import db, UserProgress, ProblemSolvingRecord, LearningStats
from datetime import datetime, timedelta
import json

progress_bp = Blueprint('progress', __name__)

@progress_bp.route('/progress', methods=['GET'])
def get_user_progress():
    """获取用户学习进度"""
    user_id = request.args.get('user_id', 'default_user')
    
    # 获取各模块进度
    theory_progress = UserProgress.query.filter_by(
        user_id=user_id, module='theory'
    ).all()
    
    cases_progress = UserProgress.query.filter_by(
        user_id=user_id, module='cases'
    ).all()
    
    practice_progress = UserProgress.query.filter_by(
        user_id=user_id, module='practice'
    ).all()
    
    # 获取学习统计
    stats = LearningStats.query.filter_by(user_id=user_id).first()
    if not stats:
        stats = LearningStats(user_id=user_id)
        db.session.add(stats)
        db.session.commit()
    
    return jsonify({
        'theory': [p.to_dict() for p in theory_progress],
        'cases': [p.to_dict() for p in cases_progress],
        'practice': [p.to_dict() for p in practice_progress],
        'stats': stats.to_dict()
    })

@progress_bp.route('/progress', methods=['POST'])
def update_progress():
    """更新学习进度"""
    data = request.get_json()
    user_id = data.get('user_id', 'default_user')
    module = data.get('module')
    lesson_id = data.get('lesson_id')
    completed = data.get('completed', False)
    score = data.get('score', 0)
    time_spent = data.get('time_spent', 0)
    
    # 查找或创建进度记录
    progress = UserProgress.query.filter_by(
        user_id=user_id, module=module, lesson_id=lesson_id
    ).first()
    
    if not progress:
        progress = UserProgress(
            user_id=user_id,
            module=module,
            lesson_id=lesson_id
        )
        db.session.add(progress)
    
    progress.completed = completed
    progress.score = score
    progress.time_spent = time_spent
    progress.updated_at = datetime.utcnow()
    
    # 更新学习统计
    stats = LearningStats.query.filter_by(user_id=user_id).first()
    if not stats:
        stats = LearningStats(user_id=user_id)
        db.session.add(stats)
    
    if completed:
        stats.total_problems_solved += 1
    
    stats.total_time_spent += time_spent
    stats.last_activity = datetime.utcnow()
    
    # 计算平均分数
    all_progress = UserProgress.query.filter_by(
        user_id=user_id, completed=True
    ).all()
    if all_progress:
        total_score = sum(p.score for p in all_progress)
        stats.average_score = total_score / len(all_progress)
    
    db.session.commit()
    
    return jsonify({
        'success': True,
        'progress': progress.to_dict(),
        'stats': stats.to_dict()
    })

@progress_bp.route('/problem-record', methods=['POST'])
def save_problem_record():
    """保存解题记录"""
    data = request.get_json()
    user_id = data.get('user_id', 'default_user')
    problem_type = data.get('problem_type')
    problem_id = data.get('problem_id')
    steps_data = data.get('steps_data', {})
    completion_time = data.get('completion_time', 0)
    success_rate = data.get('success_rate', 0.0)
    
    record = ProblemSolvingRecord(
        user_id=user_id,
        problem_type=problem_type,
        problem_id=problem_id,
        completion_time=completion_time,
        success_rate=success_rate
    )
    record.set_steps_data(steps_data)
    
    db.session.add(record)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'record': record.to_dict()
    })

@progress_bp.route('/analytics', methods=['GET'])
def get_analytics():
    """获取学习分析数据"""
    user_id = request.args.get('user_id', 'default_user')
    
    # 获取最近30天的学习记录
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    recent_progress = UserProgress.query.filter(
        UserProgress.user_id == user_id,
        UserProgress.updated_at >= thirty_days_ago
    ).all()
    
    # 获取解题记录
    problem_records = ProblemSolvingRecord.query.filter_by(
        user_id=user_id
    ).all()
    
    # 按日期分组统计
    daily_stats = {}
    for progress in recent_progress:
        date_key = progress.updated_at.strftime('%Y-%m-%d')
        if date_key not in daily_stats:
            daily_stats[date_key] = {
                'date': date_key,
                'completed_lessons': 0,
                'total_time': 0,
                'average_score': 0,
                'scores': []
            }
        
        if progress.completed:
            daily_stats[date_key]['completed_lessons'] += 1
            daily_stats[date_key]['total_time'] += progress.time_spent
            daily_stats[date_key]['scores'].append(progress.score)
    
    # 计算每日平均分
    for date_key in daily_stats:
        scores = daily_stats[date_key]['scores']
        if scores:
            daily_stats[date_key]['average_score'] = sum(scores) / len(scores)
    
    # 按问题类型统计
    problem_type_stats = {}
    for record in problem_records:
        ptype = record.problem_type
        if ptype not in problem_type_stats:
            problem_type_stats[ptype] = {
                'type': ptype,
                'count': 0,
                'average_time': 0,
                'average_success_rate': 0,
                'times': [],
                'success_rates': []
            }
        
        problem_type_stats[ptype]['count'] += 1
        problem_type_stats[ptype]['times'].append(record.completion_time)
        problem_type_stats[ptype]['success_rates'].append(record.success_rate)
    
    # 计算平均值
    for ptype in problem_type_stats:
        stats = problem_type_stats[ptype]
        if stats['times']:
            stats['average_time'] = sum(stats['times']) / len(stats['times'])
        if stats['success_rates']:
            stats['average_success_rate'] = sum(stats['success_rates']) / len(stats['success_rates'])
    
    return jsonify({
        'daily_progress': list(daily_stats.values()),
        'problem_type_stats': list(problem_type_stats.values()),
        'total_records': len(problem_records),
        'recent_activity': len(recent_progress)
    })

@progress_bp.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    """获取排行榜数据"""
    # 获取所有用户的统计数据
    all_stats = LearningStats.query.all()
    
    # 按不同维度排序
    leaderboard = {
        'by_problems_solved': sorted(
            [s.to_dict() for s in all_stats],
            key=lambda x: x['total_problems_solved'],
            reverse=True
        )[:10],
        'by_average_score': sorted(
            [s.to_dict() for s in all_stats],
            key=lambda x: x['average_score'],
            reverse=True
        )[:10],
        'by_streak_days': sorted(
            [s.to_dict() for s in all_stats],
            key=lambda x: x['streak_days'],
            reverse=True
        )[:10]
    }
    
    return jsonify(leaderboard)

