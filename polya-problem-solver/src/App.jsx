import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  Brain, 
  BookOpen, 
  FileText, 
  Target, 
  BarChart3, 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Award,
  Bot,
  Sparkles,
  Menu
} from 'lucide-react'
import TheoryLearning from './components/TheoryLearning.jsx'
import CaseAnalysis from './components/CaseAnalysis.jsx'
import InteractivePractice from './components/InteractivePractice.jsx'
import DataVisualization from './components/DataVisualization.jsx'
import AITutor from './components/AITutor.jsx'
import PersonalizedRecommendation from './components/PersonalizedRecommendation.jsx'
import './App.css'

// 主页组件
function HomePage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  
  const steps = [
    {
      title: "理解问题",
      description: "深入分析问题，明确未知量、已知数据和条件",
      icon: <Target className="w-6 h-6" />,
      color: "bg-blue-500"
    },
    {
      title: "构思方案", 
      description: "建立新问题与旧经验的联系，寻找解题思路",
      icon: <Lightbulb className="w-6 h-6" />,
      color: "bg-yellow-500"
    },
    {
      title: "执行方案",
      description: "耐心严谨地执行计划，检查每一步的正确性",
      icon: <Play className="w-6 h-6" />,
      color: "bg-green-500"
    },
    {
      title: "回顾总结",
      description: "检验结果，寻找不同解法，升华为可复用的思维工具",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "bg-purple-500"
    }
  ]

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "智能解题指导",
      description: "基于波利亚四步法，提供系统化的解题思路引导"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "数据可视化",
      description: "直观展示学习进度和解题能力提升轨迹"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "多视角分析",
      description: "从教育、工作、生活多个角度分析解题方法应用"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "成就系统",
      description: "激励性的学习成就体系，让解题过程更有趣"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* 导航栏 */}
        <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Brain className="w-8 h-8 text-indigo-600 mr-3" />
                <span className="text-xl font-bold text-gray-900 hidden sm:block">波利亚解题法</span>
                <span className="text-lg font-bold text-gray-900 sm:hidden">解题法</span>
              </div>
              
              {/* 桌面端导航 */}
              <div className="hidden lg:flex items-center space-x-4">
                <Button variant="ghost" onClick={() => navigate('/theory')}>理论学习</Button>
                <Button variant="ghost" onClick={() => navigate('/cases')}>案例分析</Button>
                <Button variant="ghost" onClick={() => navigate('/practice')}>互动练习</Button>
                <Button variant="ghost" onClick={() => navigate('/ai-tutor')}>AI导师</Button>
                <Button variant="ghost" onClick={() => navigate('/recommend')}>个性推荐</Button>
                <Button variant="ghost" onClick={() => navigate('/data')}>数据分析</Button>
                <Button onClick={() => navigate('/theory')}>开始学习</Button>
              </div>
              
              {/* 移动端菜单按钮 */}
              <div className="lg:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* 移动端菜单 */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden bg-white border-t"
              >
                <div className="px-4 py-2 space-y-1">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => { navigate('/theory'); setMobileMenuOpen(false) }}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    理论学习
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => { navigate('/cases'); setMobileMenuOpen(false) }}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    案例分析
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => { navigate('/practice'); setMobileMenuOpen(false) }}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    互动练习
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => { navigate('/ai-tutor'); setMobileMenuOpen(false) }}
                  >
                    <Bot className="w-4 h-4 mr-2" />
                    AI导师
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => { navigate('/recommend'); setMobileMenuOpen(false) }}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    个性推荐
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => { navigate('/data'); setMobileMenuOpen(false) }}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    数据分析
                  </Button>
                  <div className="pt-2 border-t">
                    <Button 
                      className="w-full" 
                      onClick={() => { navigate('/theory'); setMobileMenuOpen(false) }}
                    >
                      开始学习
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

      {/* 英雄区域 */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              掌握<span className="text-blue-600">解题的艺术</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              基于乔治·波利亚的经典理论，这里是你的智慧解题助手。
              无论是数学难题、工作挑战还是生活困境，都能找到系统化的解决方案。
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto" onClick={() => navigate('/practice')}>
                <ArrowRight className="w-5 h-5 mr-2" />
                开始解题之旅
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={() => navigate('/theory')}>
                <BookOpen className="w-5 h-5 mr-2" />
                了解理论
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 四步法介绍 */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">波利亚四步解题法</h2>
            <p className="text-lg text-gray-600">70年来指导无数人解决问题的经典方法</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setCurrentStep(index)}>
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-white mx-auto mb-4`}>
                      {step.icon}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                    <Badge variant="secondary">第{index + 1}步</Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 text-gray-400 transform -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 功能特色 */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">为什么选择我们？</h2>
            <p className="text-lg text-gray-600">科学的方法论 + 现代化的学习体验</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 学习统计 */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">学习成果一目了然</h2>
            <p className="text-lg text-gray-600">数据驱动的学习进度跟踪</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-blue-600">85%</CardTitle>
                <CardDescription>解题成功率</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={85} className="w-full" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-green-600">127</CardTitle>
                <CardDescription>已完成练习</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <Zap className="w-6 h-6 text-yellow-500 mr-2" />
                  <span className="text-sm text-gray-600">连续学习7天</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-purple-600">4.8</CardTitle>
                <CardDescription>思维能力评分</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  {[1,2,3,4,5].map((star) => (
                    <div key={star} className={`w-4 h-4 ${star <= 5 ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ⭐
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold">波利亚解题法</span>
          </div>
          <p className="text-gray-400 mb-4">
            让解题成为一种艺术，让思维成为一种习惯
          </p>
          <p className="text-sm text-gray-500">
            基于乔治·波利亚《如何解题》理论 © 2024 智慧解题助手
          </p>
        </div>
      </footer>
    </div>
  )
}

// 主应用组件
function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/theory" element={<TheoryLearning />} />
        <Route path="/cases" element={<CaseAnalysis />} />
        <Route path="/practice" element={<InteractivePractice />} />
        <Route path="/ai-tutor" element={<AITutor />} />
        <Route path="/recommend" element={<PersonalizedRecommendation />} />
        <Route path="/data" element={<DataVisualization />} />
      </Routes>
    </Router>
  )
}

export default App

