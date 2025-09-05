from flask import Blueprint, request, jsonify
import openai
import json
import os
from datetime import datetime
from src.models.progress import db, UserProgress, ProblemSolvingRecord

ai_tutor_bp = Blueprint('ai_tutor', __name__)

# 波利亚四步法知识库
POLYA_KNOWLEDGE = {
    "step1": {
        "name": "理解问题",
        "description": "深入分析问题，明确未知量、已知数据和条件",
        "strategies": [
            "仔细阅读问题，确保理解每个词的含义",
            "明确问题要求什么（未知量）",
            "列出所有已知条件和数据",
            "画图或制作表格来可视化问题",
            "用自己的话重新表述问题"
        ],
        "common_mistakes": [
            "匆忙开始解题，没有充分理解问题",
            "忽略重要的条件或约束",
            "误解问题的真正要求"
        ]
    },
    "step2": {
        "name": "构思方案",
        "description": "建立新问题与旧经验的联系，寻找解题思路",
        "strategies": [
            "回忆类似的问题和解法",
            "考虑是否可以简化问题",
            "尝试特殊情况或极端情况",
            "考虑逆向思维",
            "分解复杂问题为简单子问题"
        ],
        "common_mistakes": [
            "固执于第一个想到的方法",
            "没有考虑多种解法的可能性",
            "忽略问题的特殊性质"
        ]
    },
    "step3": {
        "name": "执行方案",
        "description": "耐心严谨地执行计划，检查每一步的正确性",
        "strategies": [
            "按步骤有序执行计划",
            "检查每一步的正确性",
            "保持计算的准确性",
            "如果遇到困难，回到第二步重新思考",
            "记录解题过程"
        ],
        "common_mistakes": [
            "计算错误或逻辑错误",
            "跳过验证步骤",
            "遇到困难就放弃"
        ]
    },
    "step4": {
        "name": "回顾总结",
        "description": "检验结果，寻找不同解法，升华为可复用的思维工具",
        "strategies": [
            "检验答案的合理性",
            "寻找其他解法",
            "总结解题的关键思路",
            "思考方法的适用范围",
            "记录经验教训"
        ],
        "common_mistakes": [
            "得到答案就停止思考",
            "不验证结果的正确性",
            "没有总结可复用的经验"
        ]
    }
}

def get_ai_response(user_message, context=None):
    """调用OpenAI API获取AI导师回复"""
    try:
        # 构建系统提示
        system_prompt = """你是一位专业的解题导师，专门指导学生运用波利亚四步解题法。你的任务是：

1. 根据波利亚四步法（理解问题→构思方案→执行方案→回顾总结）指导学生
2. 提供启发性的提示，而不是直接给出答案
3. 根据学生当前的解题阶段给出针对性建议
4. 用温和、鼓励的语气与学生交流
5. 帮助学生建立系统化的解题思维

波利亚四步法详细说明：
第一步：理解问题 - 深入分析问题，明确未知量、已知数据和条件
第二步：构思方案 - 建立新问题与旧经验的联系，寻找解题思路  
第三步：执行方案 - 耐心严谨地执行计划，检查每一步的正确性
第四步：回顾总结 - 检验结果，寻找不同解法，升华为可复用的思维工具

请始终保持耐心和鼓励，引导学生独立思考。"""

        messages = [
            {"role": "system", "content": system_prompt}
        ]
        
        if context:
            messages.append({"role": "assistant", "content": f"上下文信息：{context}"})
        
        messages.append({"role": "user", "content": user_message})

        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=500,
            temperature=0.7
        )
        
        return response.choices[0].message.content
    except Exception as e:
        return f"抱歉，AI导师暂时无法回复。请稍后再试。错误信息：{str(e)}"

@ai_tutor_bp.route('/chat', methods=['POST'])
def chat_with_tutor():
    """与AI导师对话"""
    data = request.get_json()
    user_message = data.get('message', '')
    user_id = data.get('user_id', 'default_user')
    problem_context = data.get('problem_context', '')
    current_step = data.get('current_step', 1)
    
    if not user_message:
        return jsonify({'error': '消息不能为空'}), 400
    
    # 构建上下文信息
    context = f"当前解题阶段：第{current_step}步 - {POLYA_KNOWLEDGE[f'step{current_step}']['name']}"
    if problem_context:
        context += f"\n问题背景：{problem_context}"
    
    # 获取AI回复
    ai_response = get_ai_response(user_message, context)
    
    # 记录对话历史（可选）
    try:
        # 这里可以添加对话历史记录到数据库的逻辑
        pass
    except Exception as e:
        print(f"记录对话历史失败：{e}")
    
    return jsonify({
        'response': ai_response,
        'timestamp': datetime.utcnow().isoformat(),
        'current_step': current_step,
        'step_info': POLYA_KNOWLEDGE[f'step{current_step}']
    })

@ai_tutor_bp.route('/hint', methods=['POST'])
def get_hint():
    """获取解题提示"""
    data = request.get_json()
    problem_type = data.get('problem_type', 'general')
    current_step = data.get('current_step', 1)
    user_progress = data.get('user_progress', '')
    
    step_key = f'step{current_step}'
    if step_key not in POLYA_KNOWLEDGE:
        return jsonify({'error': '无效的步骤'}), 400
    
    step_info = POLYA_KNOWLEDGE[step_key]
    
    # 根据当前步骤提供相应的提示
    hints = {
        1: [
            "试着用自己的话重新描述这个问题",
            "列出所有已知的信息和条件",
            "明确问题要求你找到什么",
            "画个图或表格来帮助理解问题"
        ],
        2: [
            "这个问题让你想起了什么类似的问题？",
            "能否将复杂问题分解为简单的部分？",
            "试试从特殊情况开始思考",
            "考虑逆向思维：如果答案是X，那么..."
        ],
        3: [
            "按照你的计划一步步执行",
            "每完成一步都要检查是否正确",
            "保持计算的准确性",
            "如果遇到困难，不要害怕回到第二步重新思考"
        ],
        4: [
            "检查你的答案是否合理",
            "还有其他解法吗？",
            "这个方法还能用在哪些类似问题上？",
            "总结一下这次解题的关键思路"
        ]
    }
    
    return jsonify({
        'step_name': step_info['name'],
        'step_description': step_info['description'],
        'hints': hints.get(current_step, []),
        'strategies': step_info['strategies'],
        'common_mistakes': step_info['common_mistakes']
    })

@ai_tutor_bp.route('/analyze-solution', methods=['POST'])
def analyze_solution():
    """分析用户的解题过程"""
    data = request.get_json()
    user_solution = data.get('solution', '')
    problem_description = data.get('problem', '')
    user_id = data.get('user_id', 'default_user')
    
    if not user_solution:
        return jsonify({'error': '解题过程不能为空'}), 400
    
    # 构建分析提示
    analysis_prompt = f"""请分析以下解题过程，并根据波利亚四步法给出评价和建议：

问题：{problem_description}

学生的解题过程：
{user_solution}

请从以下几个方面进行分析：
1. 是否正确理解了问题
2. 解题思路是否清晰
3. 执行过程是否严谨
4. 是否进行了回顾总结
5. 给出具体的改进建议

请用鼓励和建设性的语气回复。"""
    
    ai_analysis = get_ai_response(analysis_prompt)
    
    return jsonify({
        'analysis': ai_analysis,
        'timestamp': datetime.utcnow().isoformat()
    })

@ai_tutor_bp.route('/knowledge-base', methods=['GET'])
def get_knowledge_base():
    """获取波利亚四步法知识库"""
    return jsonify(POLYA_KNOWLEDGE)

@ai_tutor_bp.route('/personalized-guidance', methods=['POST'])
def get_personalized_guidance():
    """获取个性化指导"""
    data = request.get_json()
    user_id = data.get('user_id', 'default_user')
    
    # 获取用户的学习历史
    user_progress = UserProgress.query.filter_by(user_id=user_id).all()
    problem_records = ProblemSolvingRecord.query.filter_by(user_id=user_id).all()
    
    # 分析用户的弱点和强项
    weak_areas = []
    strong_areas = []
    
    if user_progress:
        # 分析各模块的完成情况
        theory_completed = len([p for p in user_progress if p.module == 'theory' and p.completed])
        cases_completed = len([p for p in user_progress if p.module == 'cases' and p.completed])
        practice_completed = len([p for p in user_progress if p.module == 'practice' and p.completed])
        
        # 分析平均分数
        avg_scores = {}
        for module in ['theory', 'cases', 'practice']:
            module_progress = [p for p in user_progress if p.module == module and p.completed]
            if module_progress:
                avg_scores[module] = sum(p.score for p in module_progress) / len(module_progress)
        
        # 识别弱点和强项
        for module, score in avg_scores.items():
            if score < 70:
                weak_areas.append(module)
            elif score > 85:
                strong_areas.append(module)
    
    # 生成个性化建议
    guidance = {
        'weak_areas': weak_areas,
        'strong_areas': strong_areas,
        'recommendations': [],
        'next_steps': []
    }
    
    if 'theory' in weak_areas:
        guidance['recommendations'].append("建议加强波利亚四步法理论学习，特别是理解问题和构思方案的技巧")
    
    if 'practice' in weak_areas:
        guidance['recommendations'].append("建议多做练习题，在实践中巩固解题方法")
    
    if not weak_areas:
        guidance['recommendations'].append("你的各项能力都很均衡，可以尝试更有挑战性的问题")
    
    return jsonify(guidance)

