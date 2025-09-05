from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class UserProgress(db.Model):
    """用户学习进度模型"""
    __tablename__ = 'user_progress'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50), nullable=False, default='default_user')
    module = db.Column(db.String(50), nullable=False)  # theory, cases, practice
    lesson_id = db.Column(db.String(50), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    score = db.Column(db.Integer, default=0)
    time_spent = db.Column(db.Integer, default=0)  # 秒
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'module': self.module,
            'lesson_id': self.lesson_id,
            'completed': self.completed,
            'score': self.score,
            'time_spent': self.time_spent,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class ProblemSolvingRecord(db.Model):
    """解题记录模型"""
    __tablename__ = 'problem_solving_records'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50), nullable=False, default='default_user')
    problem_type = db.Column(db.String(50), nullable=False)  # math, logic, life, work
    problem_id = db.Column(db.String(50), nullable=False)
    steps_data = db.Column(db.Text)  # JSON格式存储四步法数据
    completion_time = db.Column(db.Integer, default=0)  # 完成时间（秒）
    success_rate = db.Column(db.Float, default=0.0)  # 成功率
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def get_steps_data(self):
        """获取步骤数据"""
        if self.steps_data:
            return json.loads(self.steps_data)
        return {}
    
    def set_steps_data(self, data):
        """设置步骤数据"""
        self.steps_data = json.dumps(data, ensure_ascii=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'problem_type': self.problem_type,
            'problem_id': self.problem_id,
            'steps_data': self.get_steps_data(),
            'completion_time': self.completion_time,
            'success_rate': self.success_rate,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class LearningStats(db.Model):
    """学习统计模型"""
    __tablename__ = 'learning_stats'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50), nullable=False, default='default_user')
    total_problems_solved = db.Column(db.Integer, default=0)
    total_time_spent = db.Column(db.Integer, default=0)  # 总学习时间（秒）
    average_score = db.Column(db.Float, default=0.0)
    streak_days = db.Column(db.Integer, default=0)  # 连续学习天数
    last_activity = db.Column(db.DateTime, default=datetime.utcnow)
    skill_levels = db.Column(db.Text)  # JSON格式存储各技能等级
    
    def get_skill_levels(self):
        """获取技能等级数据"""
        if self.skill_levels:
            return json.loads(self.skill_levels)
        return {
            'understanding': 1,
            'planning': 1,
            'execution': 1,
            'reflection': 1
        }
    
    def set_skill_levels(self, data):
        """设置技能等级数据"""
        self.skill_levels = json.dumps(data, ensure_ascii=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'total_problems_solved': self.total_problems_solved,
            'total_time_spent': self.total_time_spent,
            'average_score': self.average_score,
            'streak_days': self.streak_days,
            'last_activity': self.last_activity.isoformat() if self.last_activity else None,
            'skill_levels': self.get_skill_levels()
        }

