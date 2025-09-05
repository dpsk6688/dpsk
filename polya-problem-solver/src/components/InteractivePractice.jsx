import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  Play, 
  Target, 
  Lightbulb, 
  CheckCircle, 
  ArrowRight,
  Trophy,
  Clock,
  Star,
  RefreshCw,
  Zap,
  Brain
} from 'lucide-react'

export default function InteractivePractice() {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [userAnswers, setUserAnswers] = useState(['', '', '', ''])
  const [showHints, setShowHints] = useState([false, false, false, false])
  const [completed, setCompleted] = useState(false)
  const [score, setScore] = useState(0)

  const exercises = [
    {
      id: 1,
      title: "数学应用题：购物优化",
      difficulty: "基础",
      category: "数学",
      description: "运用波利亚四步法解决实际购物问题",
      problem: `
        小明去超市购买水果，苹果每斤8元，橙子每斤6元，香蕉每斤4元。
        他有50元钱，想要买到总重量最多的水果。如果他至少要买1斤苹果，
        那么他应该如何分配购买，才能买到最多重量的水果？
      `,
      steps: [
        {
          title: "理解问题",
          prompt: "请分析这个问题的未知量、已知数据和条件是什么？",
          hints: [
            "未知量是什么？（要求解的目标）",
            "已知数据包括哪些信息？（价格、预算等）",
            "有什么限制条件？（至少买1斤苹果）"
          ],
          sampleAnswer: `
            未知量：苹果、橙子、香蕉的购买数量分配方案，使总重量最大
            已知数据：
            - 苹果：8元/斤
            - 橙子：6元/斤  
            - 香蕉：4元/斤
            - 总预算：50元
            条件：
            - 至少买1斤苹果
            - 总花费不超过50元
            - 目标是总重量最大
          `
        },
        {
          title: "构思方案",
          prompt: "这个问题让你想到了什么类似的问题？你准备用什么方法来解决？",
          hints: [
            "这是什么类型的优化问题？",
            "在预算约束下如何实现目标最大化？",
            "可以用什么数学方法或策略？"
          ],
          sampleAnswer: `
            这是一个约束优化问题，类似于：
            - 背包问题（在容量限制下装入最大价值）
            - 线性规划问题
            
            解题策略：
            1. 贪心算法：优先买性价比最高的水果
            2. 性价比分析：计算每元钱能买到的重量
            3. 约束处理：先满足必须买1斤苹果的条件
            
            计算性价比：
            - 苹果：1/8 = 0.125斤/元
            - 橙子：1/6 ≈ 0.167斤/元
            - 香蕉：1/4 = 0.25斤/元
          `
        },
        {
          title: "执行方案",
          prompt: "请按照你的方案计算具体的购买数量，并验证是否满足所有条件。",
          hints: [
            "先买必须的1斤苹果，剩余预算是多少？",
            "剩余预算应该如何分配？",
            "最终的总重量是多少？"
          ],
          sampleAnswer: `
            执行计算：
            
            第一步：买1斤苹果（必须条件）
            花费：1 × 8 = 8元
            剩余预算：50 - 8 = 42元
            
            第二步：用剩余预算买性价比最高的香蕉
            香蕉数量：42 ÷ 4 = 10.5斤
            
            最终方案：
            - 苹果：1斤，花费8元
            - 香蕉：10.5斤，花费42元
            - 橙子：0斤
            
            验证：
            - 总花费：8 + 42 = 50元 ✓
            - 至少1斤苹果：满足 ✓
            - 总重量：1 + 10.5 = 11.5斤
          `
        },
        {
          title: "回顾总结",
          prompt: "检验你的答案是否正确，还有其他解法吗？从中学到了什么？",
          hints: [
            "尝试其他组合，看能否得到更大的总重量？",
            "这个方法可以应用到什么其他问题？",
            "有什么经验可以总结？"
          ],
          sampleAnswer: `
            验证和反思：
            
            其他方案验证：
            - 方案2：1斤苹果 + 7斤橙子 = 8 + 42 = 50元，总重量8斤
            - 方案3：2斤苹果 + 8.5斤香蕉 = 16 + 34 = 50元，总重量10.5斤
            
            结论：原方案（1斤苹果 + 10.5斤香蕉）确实是最优的
            
            方法推广：
            - 这种贪心算法适用于单位价值最大化问题
            - 约束优化问题的一般思路：先满足硬约束，再优化目标
            
            经验总结：
            - 性价比分析是解决资源分配问题的有效工具
            - 数学建模可以帮助做出理性决策
          `
        }
      ]
    },
    {
      id: 2,
      title: "逻辑推理：会议安排",
      difficulty: "中级",
      category: "逻辑",
      description: "运用逆向思维解决复杂的时间安排问题",
      problem: `
        公司要安排5个部门（A、B、C、D、E）的会议，已知以下条件：
        1. A部门会议必须在B部门之前
        2. C部门会议不能是第一个
        3. D部门会议必须在E部门之后
        4. B部门和D部门的会议不能相邻
        请找出所有可能的会议安排顺序。
      `,
      steps: [
        {
          title: "理解问题",
          prompt: "请梳理这个问题的约束条件，明确要求解的目标。",
          hints: [
            "有哪些部门需要安排？",
            "每个约束条件具体是什么意思？",
            "最终要得到什么结果？"
          ],
          sampleAnswer: `
            问题分析：
            
            未知量：5个部门会议的所有可能排列顺序
            
            已知条件：
            - 5个部门：A、B、C、D、E
            - 约束1：A在B之前（A < B）
            - 约束2：C不能是第一个（C ≠ 1）
            - 约束3：D在E之后（E < D）
            - 约束4：B和D不相邻（|pos(B) - pos(D)| > 1）
            
            目标：找出满足所有约束的排列组合
          `
        },
        {
          title: "构思方案",
          prompt: "面对这种约束满足问题，你准备用什么策略来系统地找出所有解？",
          hints: [
            "可以用什么方法来处理多个约束条件？",
            "是正向枚举还是逆向推理更有效？",
            "如何确保不遗漏任何可能的解？"
          ],
          sampleAnswer: `
            解题策略：
            
            方法选择：约束传播 + 回溯搜索
            
            步骤：
            1. 分析约束的强度，从最强约束开始
            2. 建立部分顺序关系图
            3. 系统枚举可能的位置
            4. 逐步验证约束条件
            
            约束分析：
            - A < B 和 E < D 建立了偏序关系
            - C ≠ 1 限制了C的位置
            - B和D不相邻是最复杂的约束
            
            策略：先确定相对顺序，再考虑绝对位置
          `
        },
        {
          title: "执行方案",
          prompt: "请系统地枚举和验证所有可能的排列，确保满足所有约束条件。",
          hints: [
            "可以先列出A<B和E<D的所有可能相对位置",
            "然后考虑C不能在第一位的限制",
            "最后检查B和D是否相邻"
          ],
          sampleAnswer: `
            系统枚举：
            
            第一步：确定A<B和E<D的相对关系
            可能的子序列：
            - A,B和E,D
            - A,E,B,D（如果B,D不相邻）
            - A,E,D,B
            - E,A,B,D（如果B,D不相邻）
            - E,A,D,B
            - E,D,A,B
            
            第二步：插入C并验证约束
            逐一检验每种情况...
            
            有效解：
            1. A,E,C,D,B
            2. E,A,C,D,B  
            3. A,C,E,D,B
            4. C,A,E,D,B（C不能第一个，无效）
            
            最终答案：A,E,C,D,B 和 E,A,C,D,B 和 A,C,E,D,B
          `
        },
        {
          title: "回顾总结",
          prompt: "验证你找到的所有解，并总结解决这类问题的一般方法。",
          hints: [
            "逐一验证每个解是否满足所有约束",
            "有没有遗漏的可能性？",
            "这种方法可以推广到什么其他问题？"
          ],
          sampleAnswer: `
            验证结果：
            
            解1：A,E,C,D,B
            - A<B: ✓ (位置1<5)
            - C≠1: ✓ (C在位置3)
            - E<D: ✓ (位置2<4)
            - B,D不相邻: ✓ (位置5,4相邻，不满足)
            
            重新检验...实际有效解：
            1. A,C,E,D,B
            2. E,A,C,D,B（需要验证B,D不相邻）
            
            方法总结：
            - 约束满足问题适合用回溯搜索
            - 先处理强约束，再处理弱约束
            - 系统性验证避免遗漏
          `
        }
      ]
    }
  ]

  const stepIcons = [
    <Target className="w-5 h-5" />,
    <Lightbulb className="w-5 h-5" />,
    <Play className="w-5 h-5" />,
    <CheckCircle className="w-5 h-5" />
  ]

  const stepColors = [
    "bg-blue-500",
    "bg-yellow-500",
    "bg-green-500", 
    "bg-purple-500"
  ]

  const handleAnswerChange = (value) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentStep] = value
    setUserAnswers(newAnswers)
  }

  const toggleHint = (stepIndex) => {
    const newHints = [...showHints]
    newHints[stepIndex] = !newHints[stepIndex]
    setShowHints(newHints)
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      // 完成练习
      setCompleted(true)
      // 简单的评分逻辑
      const filledAnswers = userAnswers.filter(answer => answer.trim().length > 50).length
      setScore(Math.round((filledAnswers / 4) * 100))
    }
  }

  const resetExercise = () => {
    setCurrentStep(0)
    setUserAnswers(['', '', '', ''])
    setShowHints([false, false, false, false])
    setCompleted(false)
    setScore(0)
  }

  const currentExerciseData = exercises[currentExercise]

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Card className="p-8">
              <CardContent>
                <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  练习完成！
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  恭喜你完成了《{currentExerciseData.title}》的练习
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                      <h3 className="font-semibold">完成度</h3>
                      <p className="text-2xl font-bold text-blue-600">{score}%</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <h3 className="font-semibold">用时</h3>
                      <p className="text-2xl font-bold text-green-600">12分钟</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Zap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                      <h3 className="font-semibold">经验值</h3>
                      <p className="text-2xl font-bold text-purple-600">+{score}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <Button onClick={resetExercise} className="mr-4">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    重新练习
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      if (currentExercise < exercises.length - 1) {
                        setCurrentExercise(currentExercise + 1)
                        resetExercise()
                      }
                    }}
                    disabled={currentExercise >= exercises.length - 1}
                  >
                    下一个练习
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <Brain className="w-10 h-10 inline-block mr-3 text-purple-600" />
            互动练习
          </h1>
          <p className="text-lg text-gray-600">
            通过实际练习掌握波利亚解题法的精髓
          </p>
        </motion.div>

        {/* 练习选择 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {exercises.map((exercise, index) => (
            <Card 
              key={exercise.id}
              className={`cursor-pointer transition-all ${
                currentExercise === index 
                  ? 'ring-2 ring-purple-500 bg-purple-50' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => {
                setCurrentExercise(index)
                resetExercise()
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{exercise.title}</h3>
                  <div className="flex space-x-2">
                    <Badge variant="outline">{exercise.category}</Badge>
                    <Badge variant="secondary">{exercise.difficulty}</Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{exercise.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 当前练习 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 问题描述和进度 */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">{currentExerciseData.title}</CardTitle>
                <CardDescription>{currentExerciseData.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold mb-2">问题描述：</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {currentExerciseData.problem}
                  </p>
                </div>
                
                {/* 进度指示 */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">进度</span>
                    <span className="text-sm text-gray-500">
                      {currentStep + 1} / 4
                    </span>
                  </div>
                  <Progress value={(currentStep + 1) * 25} className="w-full" />
                </div>
              </CardContent>
            </Card>

            {/* 步骤导航 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">解题步骤</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentExerciseData.steps.map((step, index) => (
                    <div 
                      key={index}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                        currentStep === index 
                          ? stepColors[index] + ' text-white' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                      onClick={() => setCurrentStep(index)}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        currentStep === index ? 'bg-white/20' : stepColors[index] + ' text-white'
                      }`}>
                        {stepIcons[index]}
                      </div>
                      <span className="font-medium">{step.title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 答题区域 */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white mr-3 ${stepColors[currentStep]}`}>
                      {stepIcons[currentStep]}
                    </div>
                    {currentExerciseData.steps[currentStep].title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* 提示问题 */}
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold mb-2 text-blue-900">思考提示：</h4>
                    <p className="text-blue-800">
                      {currentExerciseData.steps[currentStep].prompt}
                    </p>
                  </div>

                  {/* 答题区 */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      你的答案：
                    </label>
                    <Textarea
                      value={userAnswers[currentStep]}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      placeholder="请在这里输入你的分析和答案..."
                      className="min-h-[200px]"
                    />
                  </div>

                  {/* 提示按钮 */}
                  <div className="mb-6">
                    <Button 
                      variant="outline" 
                      onClick={() => toggleHint(currentStep)}
                      className="mb-4"
                    >
                      <Lightbulb className="w-4 h-4 mr-2" />
                      {showHints[currentStep] ? '隐藏提示' : '显示提示'}
                    </Button>
                    
                    {showHints[currentStep] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-yellow-50 p-4 rounded-lg"
                      >
                        <h4 className="font-semibold mb-2 text-yellow-900">💡 提示：</h4>
                        <ul className="space-y-1 text-yellow-800">
                          {currentExerciseData.steps[currentStep].hints.map((hint, index) => (
                            <li key={index} className="text-sm">• {hint}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>

                  {/* 参考答案（可选显示） */}
                  <details className="mb-6">
                    <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-800">
                      查看参考答案
                    </summary>
                    <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                        {currentExerciseData.steps[currentStep].sampleAnswer}
                      </pre>
                    </div>
                  </details>

                  {/* 导航按钮 */}
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                      disabled={currentStep === 0}
                    >
                      上一步
                    </Button>
                    <Button onClick={nextStep}>
                      {currentStep === 3 ? '完成练习' : '下一步'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

