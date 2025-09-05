import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { 
  Bot, 
  User, 
  Send, 
  Lightbulb, 
  BookOpen, 
  MessageCircle,
  Sparkles,
  Brain,
  Target,
  CheckCircle,
  ArrowRight,
  RefreshCw
} from 'lucide-react'

export default function AITutor() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: '你好！我是你的AI解题导师。我将根据波利亚四步解题法来指导你解决问题。无论你遇到什么困难，我都会耐心地引导你找到解决方案。',
      timestamp: new Date().toISOString()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedProblem, setSelectedProblem] = useState('')
  const [showHints, setShowHints] = useState(false)
  const [hints, setHints] = useState(null)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const polyaSteps = [
    {
      id: 1,
      name: '理解问题',
      description: '深入分析问题，明确未知量、已知数据和条件',
      icon: <Target className="w-5 h-5" />,
      color: 'blue'
    },
    {
      id: 2,
      name: '构思方案',
      description: '建立新问题与旧经验的联系，寻找解题思路',
      icon: <Brain className="w-5 h-5" />,
      color: 'green'
    },
    {
      id: 3,
      name: '执行方案',
      description: '耐心严谨地执行计划，检查每一步的正确性',
      icon: <ArrowRight className="w-5 h-5" />,
      color: 'orange'
    },
    {
      id: 4,
      name: '回顾总结',
      description: '检验结果，寻找不同解法，升华为可复用的思维工具',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'purple'
    }
  ]

  const sampleProblems = [
    {
      id: 1,
      title: '数学应用题：购物优化',
      description: '小明去超市买水果，苹果每斤8元，橙子每斤6元，香蕉每斤4元。他有50元，想买到总重量最多的水果，如何购买？',
      type: 'math',
      difficulty: '基础'
    },
    {
      id: 2,
      title: '逻辑推理：会议安排',
      description: '公司要安排5个部门开会，会议室只有3个，每个会议需要2小时，如何安排能让所有部门在最短时间内完成会议？',
      type: 'logic',
      difficulty: '中级'
    },
    {
      id: 3,
      title: '生活问题：时间管理',
      description: '你需要在一天内完成工作报告、购买生日礼物、准备晚餐和锻炼身体，如何合理安排时间？',
      type: 'life',
      difficulty: '实用'
    }
  ]

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/tutor/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          user_id: 'default_user',
          problem_context: selectedProblem,
          current_step: currentStep
        })
      })

      const data = await response.json()
      
      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: data.response,
        timestamp: new Date().toISOString(),
        stepInfo: data.step_info
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('发送消息失败:', error)
      const errorMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: '抱歉，我暂时无法回复。请检查网络连接后重试。',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const getHints = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/tutor/hint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          current_step: currentStep,
          problem_type: 'general'
        })
      })

      const data = await response.json()
      setHints(data)
      setShowHints(true)
    } catch (error) {
      console.error('获取提示失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const selectProblem = (problem) => {
    setSelectedProblem(problem.description)
    const welcomeMessage = {
      id: messages.length + 1,
      type: 'ai',
      content: `很好！你选择了"${problem.title}"。让我们开始用波利亚四步法来解决这个问题。\n\n问题描述：${problem.description}\n\n现在我们从第一步开始：理解问题。请仔细阅读问题，然后告诉我你对这个问题的理解。`,
      timestamp: new Date().toISOString()
    }
    setMessages(prev => [...prev, welcomeMessage])
    setCurrentStep(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <Bot className="w-10 h-10 inline-block mr-3 text-indigo-600" />
            AI智能导师
          </h1>
          <p className="text-lg text-gray-600">
            基于波利亚四步法的智能解题指导，让我来帮助你掌握解题的艺术
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 左侧：波利亚四步法指引 */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  解题步骤
                </CardTitle>
                <CardDescription>当前进度指引</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {polyaSteps.map((step) => (
                    <motion.div
                      key={step.id}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        currentStep === step.id
                          ? `border-${step.color}-500 bg-${step.color}-50`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setCurrentStep(step.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center mb-2">
                        <div className={`p-1 rounded-full bg-${step.color}-100 text-${step.color}-600 mr-2`}>
                          {step.icon}
                        </div>
                        <span className="font-semibold text-sm">第{step.id}步</span>
                        {currentStep === step.id && (
                          <Badge variant="secondary" className="ml-auto">当前</Badge>
                        )}
                      </div>
                      <h4 className="font-medium text-sm mb-1">{step.name}</h4>
                      <p className="text-xs text-gray-600">{step.description}</p>
                    </motion.div>
                  ))}
                </div>

                <Button 
                  onClick={getHints} 
                  variant="outline" 
                  className="w-full mt-4"
                  disabled={isLoading}
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  获取提示
                </Button>
              </CardContent>
            </Card>

            {/* 示例问题 */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>示例问题</CardTitle>
                <CardDescription>选择一个问题开始练习</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sampleProblems.map((problem) => (
                    <motion.div
                      key={problem.id}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                      onClick={() => selectProblem(problem)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{problem.title}</h4>
                        <Badge variant="outline">{problem.difficulty}</Badge>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {problem.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 中间：对话区域 */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  与AI导师对话
                </CardTitle>
                <CardDescription>
                  {selectedProblem ? '正在解决问题中...' : '选择一个问题开始，或直接提问'}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                {/* 消息列表 */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          message.type === 'user' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <div className="flex items-start space-x-2">
                            {message.type === 'ai' && (
                              <Bot className="w-5 h-5 mt-0.5 text-indigo-600" />
                            )}
                            {message.type === 'user' && (
                              <User className="w-5 h-5 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                              {message.stepInfo && (
                                <div className="mt-2 p-2 bg-white bg-opacity-20 rounded text-xs">
                                  <strong>{message.stepInfo.name}</strong>: {message.stepInfo.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Bot className="w-5 h-5 text-indigo-600" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* 输入区域 */}
                <div className="flex space-x-2">
                  <Textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="输入你的问题或解题思路..."
                    className="flex-1 min-h-[60px] resize-none"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        sendMessage()
                      }
                    }}
                  />
                  <Button 
                    onClick={sendMessage} 
                    disabled={!inputMessage.trim() || isLoading}
                    className="self-end"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：提示和帮助 */}
          <div className="lg:col-span-1">
            {showHints && hints && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                    解题提示
                  </CardTitle>
                  <CardDescription>{hints.step_name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{hints.step_description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">💡 提示</h4>
                      <ul className="space-y-1">
                        {hints.hints?.map((hint, index) => (
                          <li key={index} className="text-xs text-gray-600 flex items-start">
                            <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {hint}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2">🎯 策略</h4>
                      <ul className="space-y-1">
                        {hints.strategies?.slice(0, 3).map((strategy, index) => (
                          <li key={index} className="text-xs text-gray-600 flex items-start">
                            <span className="w-1 h-1 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {strategy}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2">⚠️ 常见错误</h4>
                      <ul className="space-y-1">
                        {hints.common_mistakes?.slice(0, 2).map((mistake, index) => (
                          <li key={index} className="text-xs text-red-600 flex items-start">
                            <span className="w-1 h-1 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {mistake}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Button 
                    onClick={() => setShowHints(false)} 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4"
                  >
                    收起提示
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* 快捷操作 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                  快捷操作
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => setInputMessage('我不知道如何开始解决这个问题')}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    不知道如何开始
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => setInputMessage('请帮我检查我的解题思路')}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    检查解题思路
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => setInputMessage('这个问题还有其他解法吗？')}
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    寻找其他解法
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => setInputMessage('请总结这次解题的关键思路')}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    总结关键思路
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 学习建议 */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>💡 学习建议</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-1">耐心理解</h4>
                    <p className="text-blue-800">不要急于求解，先确保完全理解问题</p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-1">多种思路</h4>
                    <p className="text-green-800">尝试从不同角度思考问题</p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-1">反思总结</h4>
                    <p className="text-purple-800">解题后要回顾和总结经验</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

