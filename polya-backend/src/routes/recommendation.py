from flask import Blueprint, request, jsonify
import numpy as np
from datetime import datetime, timedelta
from collections import defaultdict
import json
from src.models.progress import db, UserProgress, ProblemSolvingRecord, LearningStats

recommendation_bp = Blueprint('recommendation', __name__)

class PersonalizedRecommendationEngine:
    """个性化推荐引擎"""
    
    def __init__(self):
        self.content_features = {
            'theory_lessons': [
                {
                    'id': 'theory_1',
                    'title': '波利亚解题法概述',
                    'difficulty': 1,
                    'topics': ['基础理论', '解题方法'],
                    'estimated_time': 15,
                    'prerequisites': []
                },
                {
                    'id': 'theory_2',
                    'title': '理解问题的艺术',
                    'difficulty': 2,
                    'topics': ['问题分析', '条件识别'],
                    'estimated_time': 20,
                    'prerequisites': ['theory_1']
                },
                {
                    'id': 'theory_3',
                    'title': '构思方案的策略',
                    'difficulty': 3,
                    'topics': ['创造性思维', '类比推理'],
                    'estimated_time': 25,
                    'prerequisites': ['theory_2']
                },
                {
                    'id': 'theory_4',
                    'title': '执行方案的技巧',
                    'difficulty': 3,
                    'topics': ['逻辑推理', '计算技巧'],
                    'estimated_time': 30,
                    'prerequisites': ['theory_3']
                },
                {
                    'id': 'theory_5',
                    'title': '回顾总结的重要性',
                    'difficulty': 4,
                    'topics': ['反思能力', '经验总结'],
                    'estimated_time': 20,
                    'prerequisites': ['theory_4']
                }
            ],
            'case_studies': [
                {
                    'id': 'case_math_1',
                    'title': '长方体对角线问题',
                    'difficulty': 2,
                    'topics': ['几何', '空间想象'],
                    'problem_type': 'math',
                    'estimated_time': 25
                },
                {
                    'id': 'case_logic_1',
                    'title': '项目延期问题',
                    'difficulty': 3,
                    'topics': ['逻辑推理', '时间管理'],
                    'problem_type': 'work',
                    'estimated_time': 30
                },
                {
                    'id': 'case_life_1',
                    'title': '家庭理财规划',
                    'difficulty': 3,
                    'topics': ['数学应用', '决策分析'],
                    'problem_type': 'life',
                    'estimated_time': 35
                },
                {
                    'id': 'case_math_2',
                    'title': '优化购物策略',
                    'difficulty': 2,
                    'topics': ['数学建模', '优化问题'],
                    'problem_type': 'math',
                    'estimated_time': 20
                },
                {
                    'id': 'case_work_1',
                    'title': '会议室调度问题',
                    'difficulty': 4,
                    'topics': ['资源分配', '算法思维'],
                    'problem_type': 'work',
                    'estimated_time': 40
                }
            ],
            'practice_problems': [
                {
                    'id': 'practice_basic_1',
                    'title': '基础数学应用',
                    'difficulty': 1,
                    'topics': ['基础计算', '应用题'],
                    'problem_type': 'math',
                    'estimated_time': 10
                },
                {
                    'id': 'practice_logic_1',
                    'title': '逻辑推理入门',
                    'difficulty': 2,
                    'topics': ['逻辑思维', '推理能力'],
                    'problem_type': 'logic',
                    'estimated_time': 15
                },
                {
                    'id': 'practice_advanced_1',
                    'title': '综合应用挑战',
                    'difficulty': 4,
                    'topics': ['综合应用', '创新思维'],
                    'problem_type': 'mixed',
                    'estimated_time': 45
                },
                {
                    'id': 'practice_life_1',
                    'title': '生活问题解决',
                    'difficulty': 2,
                    'topics': ['实际应用', '生活技能'],
                    'problem_type': 'life',
                    'estimated_time': 20
                },
                {
                    'id': 'practice_work_1',
                    'title': '职场问题分析',
                    'difficulty': 3,
                    'topics': ['工作技能', '问题解决'],
                    'problem_type': 'work',
                    'estimated_time': 30
                }
            ]
        }
    
    def get_user_profile(self, user_id):
        """获取用户画像"""
        # 获取用户学习历史
        user_progress = UserProgress.query.filter_by(user_id=user_id).all()
        problem_records = ProblemSolvingRecord.query.filter_by(user_id=user_id).all()
        learning_stats = LearningStats.query.filter_by(user_id=user_id).first()
        
        profile = {
            'skill_levels': {'understanding': 1, 'planning': 1, 'execution': 1, 'reflection': 1},
            'preferred_topics': [],
            'preferred_difficulty': 1,
            'preferred_problem_types': [],
            'learning_pace': 'normal',
            'weak_areas': [],
            'strong_areas': [],
            'total_time_spent': 0,
            'completion_rate': 0
        }
        
        if learning_stats:
            profile['skill_levels'] = learning_stats.get_skill_levels()
            profile['total_time_spent'] = learning_stats.total_time_spent
        
        if user_progress:
            # 分析完成率
            completed_count = len([p for p in user_progress if p.completed])
            total_count = len(user_progress)
            profile['completion_rate'] = completed_count / total_count if total_count > 0 else 0
            
            # 分析偏好难度
            completed_progress = [p for p in user_progress if p.completed]
            if completed_progress:
                avg_score = sum(p.score for p in completed_progress) / len(completed_progress)
                if avg_score >= 85:
                    profile['preferred_difficulty'] = min(4, profile['preferred_difficulty'] + 1)
                elif avg_score < 70:
                    profile['preferred_difficulty'] = max(1, profile['preferred_difficulty'] - 1)
            
            # 分析模块偏好
            module_performance = defaultdict(list)
            for progress in completed_progress:
                module_performance[progress.module].append(progress.score)
            
            for module, scores in module_performance.items():
                avg_score = sum(scores) / len(scores)
                if avg_score >= 80:
                    profile['strong_areas'].append(module)
                elif avg_score < 70:
                    profile['weak_areas'].append(module)
        
        if problem_records:
            # 分析问题类型偏好
            type_performance = defaultdict(list)
            for record in problem_records:
                type_performance[record.problem_type].append(record.success_rate)
            
            for ptype, rates in type_performance.items():
                avg_rate = sum(rates) / len(rates)
                if avg_rate >= 0.8:
                    profile['preferred_problem_types'].append(ptype)
            
            # 分析学习节奏
            avg_time = sum(r.completion_time for r in problem_records) / len(problem_records)
            if avg_time < 600:  # 10分钟
                profile['learning_pace'] = 'fast'
            elif avg_time > 1800:  # 30分钟
                profile['learning_pace'] = 'slow'
        
        return profile
    
    def content_based_recommendation(self, user_profile, content_type='all'):
        """基于内容的推荐"""
        recommendations = []
        
        content_types = ['theory_lessons', 'case_studies', 'practice_problems']
        if content_type != 'all':
            content_types = [content_type]
        
        for ctype in content_types:
            for item in self.content_features[ctype]:
                score = self.calculate_content_score(user_profile, item)
                recommendations.append({
                    'content_type': ctype,
                    'item': item,
                    'score': score,
                    'reason': self.get_recommendation_reason(user_profile, item)
                })
        
        # 按分数排序
        recommendations.sort(key=lambda x: x['score'], reverse=True)
        return recommendations[:10]  # 返回前10个推荐
    
    def calculate_content_score(self, user_profile, item):
        """计算内容推荐分数"""
        score = 0.0
        
        # 难度匹配 (权重: 0.3)
        difficulty_diff = abs(item['difficulty'] - user_profile['preferred_difficulty'])
        difficulty_score = max(0, 1 - difficulty_diff * 0.3)
        score += difficulty_score * 0.3
        
        # 主题匹配 (权重: 0.2)
        topic_match = len(set(item.get('topics', [])) & set(user_profile['preferred_topics']))
        topic_score = min(1.0, topic_match * 0.5)
        score += topic_score * 0.2
        
        # 问题类型匹配 (权重: 0.2)
        if item.get('problem_type') in user_profile['preferred_problem_types']:
            score += 0.2
        
        # 学习时间匹配 (权重: 0.15)
        estimated_time = item.get('estimated_time', 20)
        if user_profile['learning_pace'] == 'fast' and estimated_time <= 15:
            score += 0.15
        elif user_profile['learning_pace'] == 'slow' and estimated_time >= 25:
            score += 0.15
        elif user_profile['learning_pace'] == 'normal' and 15 <= estimated_time <= 25:
            score += 0.15
        
        # 弱点补强 (权重: 0.15)
        if any(weak in item.get('topics', []) for weak in user_profile['weak_areas']):
            score += 0.15
        
        return score
    
    def get_recommendation_reason(self, user_profile, item):
        """获取推荐理由"""
        reasons = []
        
        if item['difficulty'] == user_profile['preferred_difficulty']:
            reasons.append("难度适合")
        elif item['difficulty'] == user_profile['preferred_difficulty'] + 1:
            reasons.append("适度挑战")
        
        if item.get('problem_type') in user_profile['preferred_problem_types']:
            reasons.append("符合偏好类型")
        
        if any(weak in item.get('topics', []) for weak in user_profile['weak_areas']):
            reasons.append("有助于提升弱项")
        
        if any(strong in item.get('topics', []) for strong in user_profile['strong_areas']):
            reasons.append("发挥优势领域")
        
        return reasons if reasons else ["推荐尝试"]
    
    def collaborative_filtering_recommendation(self, user_id):
        """协同过滤推荐"""
        # 简化的协同过滤实现
        # 在实际应用中，这里会使用更复杂的算法
        
        # 获取所有用户的学习记录
        all_progress = UserProgress.query.all()
        
        # 构建用户-物品矩阵
        user_item_matrix = defaultdict(dict)
        for progress in all_progress:
            user_item_matrix[progress.user_id][progress.lesson_id] = progress.score
        
        # 找到相似用户
        target_user_items = user_item_matrix.get(user_id, {})
        similar_users = []
        
        for other_user, other_items in user_item_matrix.items():
            if other_user != user_id:
                similarity = self.calculate_user_similarity(target_user_items, other_items)
                if similarity > 0.5:  # 相似度阈值
                    similar_users.append((other_user, similarity))
        
        # 基于相似用户推荐
        recommendations = []
        for similar_user, similarity in similar_users:
            for item_id, score in user_item_matrix[similar_user].items():
                if item_id not in target_user_items and score >= 80:
                    recommendations.append({
                        'item_id': item_id,
                        'predicted_score': score * similarity,
                        'reason': f"相似用户喜欢 (相似度: {similarity:.2f})"
                    })
        
        # 按预测分数排序
        recommendations.sort(key=lambda x: x['predicted_score'], reverse=True)
        return recommendations[:5]
    
    def calculate_user_similarity(self, user1_items, user2_items):
        """计算用户相似度"""
        common_items = set(user1_items.keys()) & set(user2_items.keys())
        if len(common_items) < 2:
            return 0
        
        # 使用皮尔逊相关系数
        sum1 = sum(user1_items[item] for item in common_items)
        sum2 = sum(user2_items[item] for item in common_items)
        
        sum1_sq = sum(user1_items[item] ** 2 for item in common_items)
        sum2_sq = sum(user2_items[item] ** 2 for item in common_items)
        
        sum_products = sum(user1_items[item] * user2_items[item] for item in common_items)
        
        n = len(common_items)
        numerator = sum_products - (sum1 * sum2 / n)
        denominator = ((sum1_sq - sum1 ** 2 / n) * (sum2_sq - sum2 ** 2 / n)) ** 0.5
        
        if denominator == 0:
            return 0
        
        return numerator / denominator

# 创建推荐引擎实例
recommendation_engine = PersonalizedRecommendationEngine()

@recommendation_bp.route('/personalized', methods=['GET'])
def get_personalized_recommendations():
    """获取个性化推荐"""
    user_id = request.args.get('user_id', 'default_user')
    content_type = request.args.get('content_type', 'all')
    
    # 获取用户画像
    user_profile = recommendation_engine.get_user_profile(user_id)
    
    # 基于内容的推荐
    content_recommendations = recommendation_engine.content_based_recommendation(
        user_profile, content_type
    )
    
    # 协同过滤推荐
    collaborative_recommendations = recommendation_engine.collaborative_filtering_recommendation(user_id)
    
    return jsonify({
        'user_profile': user_profile,
        'content_based_recommendations': [
            {
                'id': rec['item']['id'],
                'title': rec['item']['title'],
                'content_type': rec['content_type'],
                'difficulty': rec['item']['difficulty'],
                'estimated_time': rec['item'].get('estimated_time', 20),
                'topics': rec['item'].get('topics', []),
                'score': round(rec['score'], 3),
                'reasons': rec['reason']
            }
            for rec in content_recommendations
        ],
        'collaborative_recommendations': collaborative_recommendations,
        'timestamp': datetime.utcnow().isoformat()
    })

@recommendation_bp.route('/learning-path', methods=['GET'])
def get_learning_path():
    """获取个性化学习路径"""
    user_id = request.args.get('user_id', 'default_user')
    
    user_profile = recommendation_engine.get_user_profile(user_id)
    
    # 构建学习路径
    learning_path = []
    
    # 1. 基础理论（如果用户是新手）
    if user_profile['total_time_spent'] < 3600:  # 少于1小时
        learning_path.extend([
            {
                'phase': '基础入门',
                'items': [
                    {'id': 'theory_1', 'title': '波利亚解题法概述', 'type': 'theory'},
                    {'id': 'theory_2', 'title': '理解问题的艺术', 'type': 'theory'}
                ]
            }
        ])
    
    # 2. 针对弱点的专项训练
    if user_profile['weak_areas']:
        weak_area_items = []
        for weak_area in user_profile['weak_areas']:
            if weak_area == 'theory':
                weak_area_items.extend([
                    {'id': 'theory_3', 'title': '构思方案的策略', 'type': 'theory'},
                    {'id': 'theory_4', 'title': '执行方案的技巧', 'type': 'theory'}
                ])
            elif weak_area == 'practice':
                weak_area_items.extend([
                    {'id': 'practice_basic_1', 'title': '基础数学应用', 'type': 'practice'},
                    {'id': 'practice_logic_1', 'title': '逻辑推理入门', 'type': 'practice'}
                ])
        
        if weak_area_items:
            learning_path.append({
                'phase': '弱点强化',
                'items': weak_area_items
            })
    
    # 3. 案例学习
    case_items = [
        {'id': 'case_math_1', 'title': '长方体对角线问题', 'type': 'case'},
        {'id': 'case_logic_1', 'title': '项目延期问题', 'type': 'case'}
    ]
    learning_path.append({
        'phase': '案例实践',
        'items': case_items
    })
    
    # 4. 高级挑战（如果用户水平较高）
    if user_profile['preferred_difficulty'] >= 3:
        learning_path.append({
            'phase': '高级挑战',
            'items': [
                {'id': 'practice_advanced_1', 'title': '综合应用挑战', 'type': 'practice'},
                {'id': 'case_work_1', 'title': '会议室调度问题', 'type': 'case'}
            ]
        })
    
    return jsonify({
        'learning_path': learning_path,
        'estimated_total_time': sum(
            len(phase['items']) * 25 for phase in learning_path
        ),
        'user_level': user_profile['preferred_difficulty'],
        'personalization_factors': {
            'weak_areas': user_profile['weak_areas'],
            'strong_areas': user_profile['strong_areas'],
            'learning_pace': user_profile['learning_pace']
        }
    })

@recommendation_bp.route('/next-recommendation', methods=['POST'])
def get_next_recommendation():
    """获取下一个推荐内容"""
    data = request.get_json()
    user_id = data.get('user_id', 'default_user')
    completed_item_id = data.get('completed_item_id')
    performance_score = data.get('performance_score', 0)
    
    # 更新用户画像
    user_profile = recommendation_engine.get_user_profile(user_id)
    
    # 根据刚完成的内容和表现调整推荐
    if performance_score >= 85:
        # 表现良好，可以尝试更难的内容
        user_profile['preferred_difficulty'] = min(4, user_profile['preferred_difficulty'] + 0.5)
    elif performance_score < 70:
        # 表现不佳，推荐巩固性内容
        user_profile['preferred_difficulty'] = max(1, user_profile['preferred_difficulty'] - 0.5)
    
    # 获取推荐
    recommendations = recommendation_engine.content_based_recommendation(user_profile)
    
    # 过滤掉已完成的内容
    filtered_recommendations = [
        rec for rec in recommendations 
        if rec['item']['id'] != completed_item_id
    ]
    
    next_recommendation = filtered_recommendations[0] if filtered_recommendations else None
    
    return jsonify({
        'next_recommendation': {
            'id': next_recommendation['item']['id'],
            'title': next_recommendation['item']['title'],
            'content_type': next_recommendation['content_type'],
            'difficulty': next_recommendation['item']['difficulty'],
            'estimated_time': next_recommendation['item'].get('estimated_time', 20),
            'reasons': next_recommendation['reason']
        } if next_recommendation else None,
        'performance_feedback': {
            'score': performance_score,
            'level_adjustment': user_profile['preferred_difficulty'],
            'encouragement': self.get_encouragement_message(performance_score)
        }
    })

def get_encouragement_message(score):
    """获取鼓励消息"""
    if score >= 90:
        return "出色的表现！你已经掌握得很好了，可以挑战更难的内容。"
    elif score >= 80:
        return "做得很好！继续保持这个学习节奏。"
    elif score >= 70:
        return "不错的进步！多练习几次就能完全掌握。"
    else:
        return "没关系，学习需要时间。建议先巩固基础知识。"

@recommendation_bp.route('/adaptive-difficulty', methods=['POST'])
def adjust_adaptive_difficulty():
    """自适应难度调整"""
    data = request.get_json()
    user_id = data.get('user_id', 'default_user')
    recent_scores = data.get('recent_scores', [])
    
    if not recent_scores:
        return jsonify({'error': '需要提供最近的成绩数据'}), 400
    
    # 计算平均成绩和趋势
    avg_score = sum(recent_scores) / len(recent_scores)
    
    # 计算成绩趋势
    if len(recent_scores) >= 3:
        recent_trend = (recent_scores[-1] + recent_scores[-2]) / 2 - (recent_scores[0] + recent_scores[1]) / 2
    else:
        recent_trend = 0
    
    # 难度调整建议
    difficulty_adjustment = 0
    recommendation_type = 'maintain'
    
    if avg_score >= 85 and recent_trend >= 0:
        difficulty_adjustment = 1
        recommendation_type = 'increase'
        message = "你的表现很出色，建议尝试更有挑战性的内容"
    elif avg_score < 70 or recent_trend < -10:
        difficulty_adjustment = -1
        recommendation_type = 'decrease'
        message = "建议先巩固当前难度的内容，打好基础"
    else:
        message = "当前难度很适合你，继续保持"
    
    return jsonify({
        'current_performance': {
            'average_score': round(avg_score, 1),
            'trend': round(recent_trend, 1),
            'performance_level': 'excellent' if avg_score >= 85 else 'good' if avg_score >= 75 else 'needs_improvement'
        },
        'difficulty_adjustment': {
            'adjustment': difficulty_adjustment,
            'type': recommendation_type,
            'message': message
        },
        'recommended_actions': self.get_recommended_actions(avg_score, recent_trend)
    })

def get_recommended_actions(avg_score, trend):
    """获取推荐行动"""
    actions = []
    
    if avg_score >= 85:
        actions.append("尝试更高难度的挑战题")
        actions.append("学习高级解题技巧")
    elif avg_score >= 75:
        actions.append("继续当前学习节奏")
        actions.append("适当增加练习量")
    else:
        actions.append("回顾基础理论知识")
        actions.append("多做基础练习题")
        actions.append("寻求AI导师的帮助")
    
    if trend < -5:
        actions.append("分析最近的错误原因")
        actions.append("调整学习策略")
    
    return actions

