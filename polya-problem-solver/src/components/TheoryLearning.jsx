import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  BookOpen, 
  Target, 
  Lightbulb, 
  Play, 
  CheckCircle, 
  ArrowRight,
  Clock,
  Users,
  Award
} from 'lucide-react'

export default function TheoryLearning() {
  const [currentLesson, setCurrentLesson] = useState(0)
  const [progress, setProgress] = useState(25)

  const lessons = [
    {
      id: 1,
      title: "波利亚解题法概述",
      duration: "15分钟",
      difficulty: "入门",
      description: "了解乔治·波利亚和他的经典著作《如何解题》",
      content: `
        乔治·波利亚（1887-1985）是20世纪最伟大的数学教育家之一。他在斯坦福大学执教多年，
        深深感受到传统数学教育的弊端：学生们被迫进行机械化的操作演练，缺乏独立思考的机会。
        
        波利亚认为，解题不是天赋，而是一种可以学习和训练的技能。他提出的四步解题法，
        为无数学生和研究者提供了系统化的思维框架。
        
        这套方法的核心理念是：解题的真正乐趣不在于最终答案，而在于发现的过程。
        每一次解题都包含了一丝发现的微光，都是对思维能力的锻炼和提升。
      `,
      keyPoints: [
        "波利亚是数学教育改革的先驱",
        "解题能力是可以训练的技能",
        "重视思维过程胜过最终答案",
        "四步法适用于各种问题"
      ]
    },
    {
      id: 2,
      title: "第一步：理解问题",
      duration: "20分钟", 
      difficulty: "基础",
      description: "学会深入分析问题，明确未知量、已知数据和条件",
      content: `
        理解问题是解题的第一步，也是最关键的一步。很多人急于求解，却没有真正理解问题，
        这就像试图回答一个你根本没听懂的问题一样愚蠢。
        
        在这一步中，你需要像侦探一样仔细分析：
        
        1. **未知量是什么？** - 你要求解的目标是什么？
        2. **已知数据是什么？** - 题目给了你哪些信息？
        3. **条件是什么？** - 这些信息之间有什么关系？
        
        理解问题的标志是：你能用自己的话流畅地复述问题，甚至可以暂时忘掉题目，
        但仍然记得问题的核心要求。
      `,
      keyPoints: [
        "明确未知量、已知数据和条件",
        "画图和引入符号帮助理解",
        "用自己的话复述问题",
        "不要急于求解"
      ]
    },
    {
      id: 3,
      title: "第二步：构思方案",
      duration: "25分钟",
      difficulty: "进阶", 
      description: "建立新问题与旧经验的联系，寻找解题思路",
      content: `
        构思方案是解题过程中最具创造性的一步。这里需要你调动所有的知识储备，
        寻找新问题与已有经验之间的联系。
        
        波利亚提供了一系列启发式问题：
        
        - 你以前见过类似的问题吗？
        - 你知道相关的问题吗？
        - 看那个未知量，你能想到熟悉的问题吗？
        - 你能利用已有的结果或方法吗？
        
        这个过程就像在知识库中进行搜索，未知量是你的搜索关键词。
        通过类比、联想，将复杂的新问题转化为你已经会解决的旧问题。
      `,
      keyPoints: [
        "激活相关的知识和经验",
        "寻找类似或相关的问题",
        "建立新旧问题的联系",
        "制定具体的解题计划"
      ]
    },
    {
      id: 4,
      title: "第三步：执行方案",
      duration: "18分钟",
      difficulty: "基础",
      description: "耐心严谨地执行计划，检查每一步的正确性",
      content: `
        执行方案相对简单，但需要极大的耐心和严谨性。这一步就像建筑工人按照图纸施工，
        需要确保每一个细节都准确无误。
        
        执行过程中的黄金法则：**检查每一步**
        
        - 你能清楚地看到这一步是正确的吗？
        - 你能证明它是正确的吗？
        
        一个复杂的解题过程往往环环相扣，任何一个环节的错误都可能导致全盘失败。
        因此，边执行边检查，确保每一步都有充分的依据。
        
        记住：执行方案考验的不是创造力，而是纪律性。
      `,
      keyPoints: [
        "按计划有序执行",
        "检查每一步的正确性",
        "保持严谨的态度",
        "及时发现和纠正错误"
      ]
    },
    {
      id: 5,
      title: "第四步：回顾总结",
      duration: "22分钟",
      difficulty: "高级",
      description: "检验结果，寻找不同解法，升华为可复用的思维工具",
      content: `
        回顾总结是最容易被忽略，但却是最宝贵的一步。很多人解完题就扔笔走人，
        错过了整个过程中最有价值的部分。
        
        在这一步中，你应该问自己：
        
        1. **检验结果** - 答案合理吗？能通过验证吗？
        2. **寻找其他方法** - 还有别的解法吗？
        3. **思考普适性** - 这个方法能用到其他问题上吗？
        4. **总结经验** - 从中学到了什么？
        
        通过回顾，你不仅解决了一个问题，更重要的是获得了解决一类问题的能力。
        你的思维工具箱又多了一件趁手的兵器。
      `,
      keyPoints: [
        "验证结果的正确性",
        "探索不同的解法",
        "思考方法的普适性",
        "总结可复用的经验"
      ]
    }
  ]

  const thinkingTools = [
    {
      name: "类比思维",
      description: "将复杂问题类比到简单熟悉的领域",
      example: "四面体重心 → 三角形重心",
      icon: <Target className="w-5 h-5" />
    },
    {
      name: "推广思维", 
      description: "从特殊情况推广到一般原理",
      example: "勾股定理 → 余弦定理",
      icon: <ArrowRight className="w-5 h-5" />
    },
    {
      name: "逆向工作法",
      description: "从目标倒推实现路径",
      example: "倒水问题的逆向分析",
      icon: <Play className="w-5 h-5" />
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <BookOpen className="w-10 h-10 inline-block mr-3 text-blue-600" />
            理论学习
          </h1>
          <p className="text-lg text-gray-600">
            深入理解波利亚解题法的核心理念和实践方法
          </p>
        </motion.div>

        {/* 学习进度 */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>学习进度</CardTitle>
              <Badge variant="secondary">{progress}% 完成</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-gray-600 mt-2">
              已完成 {Math.floor(progress / 20)} / 5 个课程
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 课程列表 */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>课程目录</CardTitle>
                <CardDescription>选择一个课程开始学习</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {lessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all ${
                        currentLesson === index 
                          ? 'ring-2 ring-blue-500 bg-blue-50' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setCurrentLesson(index)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm mb-1">
                              {lesson.title}
                            </h3>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>{lesson.duration}</span>
                              <Badge variant="outline" className="text-xs">
                                {lesson.difficulty}
                              </Badge>
                            </div>
                          </div>
                          {currentLesson === index && (
                            <Play className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* 思维工具 */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                  思维工具
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {thinkingTools.map((tool, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center mb-1">
                      {tool.icon}
                      <h4 className="font-semibold text-sm ml-2">{tool.name}</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{tool.description}</p>
                    <p className="text-xs text-blue-600 italic">例：{tool.example}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* 课程内容 */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentLesson}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">
                        {lessons[currentLesson].title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {lessons[currentLesson].description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">
                        {lessons[currentLesson].difficulty}
                      </Badge>
                      <Badge variant="secondary">
                        <Clock className="w-3 h-3 mr-1" />
                        {lessons[currentLesson].duration}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="content" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="content">课程内容</TabsTrigger>
                      <TabsTrigger value="keypoints">重点总结</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="content" className="mt-6">
                      <div className="prose prose-gray max-w-none">
                        {lessons[currentLesson].content.split('\n').map((paragraph, index) => (
                          paragraph.trim() && (
                            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                              {paragraph.trim()}
                            </p>
                          )
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="keypoints" className="mt-6">
                      <div className="space-y-3">
                        {lessons[currentLesson].keyPoints.map((point, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center p-3 bg-blue-50 rounded-lg"
                          >
                            <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{point}</span>
                          </motion.div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* 导航按钮 */}
                  <div className="flex justify-between mt-8">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
                      disabled={currentLesson === 0}
                    >
                      上一课
                    </Button>
                    <Button 
                      onClick={() => {
                        if (currentLesson < lessons.length - 1) {
                          setCurrentLesson(currentLesson + 1)
                          setProgress(Math.min(100, progress + 20))
                        }
                      }}
                      disabled={currentLesson === lessons.length - 1}
                    >
                      下一课
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

