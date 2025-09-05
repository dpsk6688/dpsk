import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  Sparkles, 
  User, 
  BookOpen, 
  Target, 
  Clock, 
  TrendingUp,
  Star,
  ArrowRight,
  Brain,
  Lightbulb,
  Award,
  BarChart3,
  Route,
  RefreshCw
} from 'lucide-react'

export default function PersonalizedRecommendation() {
  const [userProfile, setUserProfile] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [learningPath, setLearningPath] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState('recommendations')

  useEffect(() => {
    fetchPersonalizedData()
  }, [])

  const fetchPersonalizedData = async () => {
    setIsLoading(true)
    try {
      // 获取个性化推荐
      const recommendResponse = await fetch('/api/recommend/personalized?user_id=default_user')
      const recommendData = await recommendResponse.json()
      
      // 获取学习路径
      const pathResponse = await fetch('/api/recommend/learning-path?user_id=default_user')
      const pathData = await pathResponse.json()
      
      setUserProfile(recommendData.user_profile)
      setRecommendations(recommendData.content_based_recommendations)
      setLearningPath(pathData.learning_path)
    } catch (error) {
      console.error('获取个性化数据失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getSkillLevelColor = (level) => {
    if (level >= 4) return 'text-green-600 bg-green-100'
    if (level >= 3) return 'text-blue-600 bg-blue-100'
    if (level >= 2) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getSkillLevelText = (level) => {
    if (level >= 4) return '精通'
    if (level >= 3) return '熟练'
    if (level >= 2) return '一般'
    return '初学'
  }

  const getDifficultyColor = (difficulty) => {
    const colors = {
      1: 'bg-green-100 text-green-800',
      2: 'bg-blue-100 text-blue-800',
      3: 'bg-yellow-100 text-yellow-800',
      4: 'bg-red-100 text-red-800'
    }
    return colors[difficulty] || 'bg-gray-100 text-gray-800'
  }

  const getDifficultyText = (difficulty) => {
    const texts = { 1: '基础', 2: '进阶', 3: '中级', 4: '高级' }
    return texts[difficulty] || '未知'
  }

  const getContentTypeIcon = (type) => {
    const icons = {
      'theory_lessons': <BookOpen className="w-4 h-4" />,
      'case_studies': <Target className="w-4 h-4" />,
      'practice_problems': <Brain className="w-4 h-4" />
    }
    return icons[type] || <Lightbulb className="w-4 h-4" />
  }

  const getContentTypeName = (type) => {
    const names = {
      'theory_lessons': '理论课程',
      'case_studies': '案例分析',
      'practice_problems': '练习题'
    }
    return names[type] || '未知类型'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-4" />
              <p className="text-gray-600">正在分析你的学习数据...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <Sparkles className="w-10 h-10 inline-block mr-3 text-purple-600" />
            个性化推荐
          </h1>
          <p className="text-lg text-gray-600">
            基于你的学习数据，为你量身定制的学习建议
          </p>
        </motion.div>

        {/* 标签页导航 */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <Button
              variant={selectedTab === 'recommendations' ? 'default' : 'ghost'}
              onClick={() => setSelectedTab('recommendations')}
              className="mr-1"
            >
              <Star className="w-4 h-4 mr-2" />
              智能推荐
            </Button>
            <Button
              variant={selectedTab === 'profile' ? 'default' : 'ghost'}
              onClick={() => setSelectedTab('profile')}
              className="mr-1"
            >
              <User className="w-4 h-4 mr-2" />
              学习画像
            </Button>
            <Button
              variant={selectedTab === 'path' ? 'default' : 'ghost'}
              onClick={() => setSelectedTab('path')}
            >
              <Route className="w-4 h-4 mr-2" />
              学习路径
            </Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selectedTab === 'recommendations' && (
            <motion.div
              key="recommendations"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* 推荐内容列表 */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className="w-5 h-5 mr-2 text-yellow-500" />
                      为你推荐
                    </CardTitle>
                    <CardDescription>
                      基于你的学习习惯和能力水平精心挑选
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recommendations.map((rec, index) => (
                        <motion.div
                          key={rec.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-purple-100 rounded-lg">
                                {getContentTypeIcon(rec.content_type)}
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{rec.title}</h3>
                                <p className="text-sm text-gray-600">
                                  {getContentTypeName(rec.content_type)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getDifficultyColor(rec.difficulty)}>
                                {getDifficultyText(rec.difficulty)}
                              </Badge>
                              <Badge variant="outline">
                                匹配度 {Math.round(rec.score * 100)}%
                              </Badge>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 mb-3">
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="w-4 h-4 mr-1" />
                              约 {rec.estimated_time} 分钟
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <BarChart3 className="w-4 h-4 mr-1" />
                              推荐指数 {Math.round(rec.score * 100)}%
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {rec.topics?.map((topic, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {rec.reasons?.map((reason, idx) => (
                                <span key={idx} className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">
                                  {reason}
                                </span>
                              ))}
                            </div>
                            <Button size="sm">
                              开始学习
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 推荐统计 */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                      推荐统计
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>理论课程</span>
                          <span>{recommendations.filter(r => r.content_type === 'theory_lessons').length}</span>
                        </div>
                        <Progress 
                          value={(recommendations.filter(r => r.content_type === 'theory_lessons').length / recommendations.length) * 100} 
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>案例分析</span>
                          <span>{recommendations.filter(r => r.content_type === 'case_studies').length}</span>
                        </div>
                        <Progress 
                          value={(recommendations.filter(r => r.content_type === 'case_studies').length / recommendations.length) * 100} 
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>练习题</span>
                          <span>{recommendations.filter(r => r.content_type === 'practice_problems').length}</span>
                        </div>
                        <Progress 
                          value={(recommendations.filter(r => r.content_type === 'practice_problems').length / recommendations.length) * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>学习建议</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {userProfile?.weak_areas?.length > 0 && (
                        <div className="p-3 bg-yellow-50 rounded-lg">
                          <h4 className="font-semibold text-yellow-900 mb-1">需要加强</h4>
                          <p className="text-sm text-yellow-800">
                            建议重点关注 {userProfile.weak_areas.join('、')} 相关内容
                          </p>
                        </div>
                      )}
                      
                      {userProfile?.strong_areas?.length > 0 && (
                        <div className="p-3 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-green-900 mb-1">优势领域</h4>
                          <p className="text-sm text-green-800">
                            你在 {userProfile.strong_areas.join('、')} 方面表现出色
                          </p>
                        </div>
                      )}
                      
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-1">学习节奏</h4>
                        <p className="text-sm text-blue-800">
                          你的学习节奏偏{userProfile?.learning_pace === 'fast' ? '快' : userProfile?.learning_pace === 'slow' ? '慢' : '中等'}，建议保持当前节奏
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {selectedTab === 'profile' && userProfile && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* 技能水平 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-blue-500" />
                    技能水平评估
                  </CardTitle>
                  <CardDescription>基于你的学习表现分析</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(userProfile.skill_levels).map(([skill, level]) => {
                      const skillNames = {
                        understanding: '理解问题',
                        planning: '构思方案',
                        execution: '执行方案',
                        reflection: '回顾总结'
                      }
                      return (
                        <div key={skill} className="flex items-center justify-between">
                          <span className="font-medium">{skillNames[skill]}</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={level * 20} className="w-24 h-2" />
                            <Badge className={getSkillLevelColor(level)}>
                              {getSkillLevelText(level)}
                            </Badge>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* 学习统计 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-green-500" />
                    学习统计
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>总学习时间</span>
                      <span className="font-semibold">
                        {Math.round(userProfile.total_time_spent / 60)} 分钟
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>完成率</span>
                      <span className="font-semibold">
                        {Math.round(userProfile.completion_rate * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>偏好难度</span>
                      <Badge className={getDifficultyColor(userProfile.preferred_difficulty)}>
                        {getDifficultyText(userProfile.preferred_difficulty)}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>学习节奏</span>
                      <span className="font-semibold">
                        {userProfile.learning_pace === 'fast' ? '快速' : 
                         userProfile.learning_pace === 'slow' ? '慢速' : '正常'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 偏好分析 */}
              <Card>
                <CardHeader>
                  <CardTitle>学习偏好</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">偏好主题</h4>
                      <div className="flex flex-wrap gap-2">
                        {userProfile.preferred_topics?.length > 0 ? (
                          userProfile.preferred_topics.map((topic, idx) => (
                            <Badge key={idx} variant="secondary">{topic}</Badge>
                          ))
                        ) : (
                          <span className="text-gray-500 text-sm">暂无数据</span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">偏好问题类型</h4>
                      <div className="flex flex-wrap gap-2">
                        {userProfile.preferred_problem_types?.length > 0 ? (
                          userProfile.preferred_problem_types.map((type, idx) => (
                            <Badge key={idx} variant="outline">{type}</Badge>
                          ))
                        ) : (
                          <span className="text-gray-500 text-sm">暂无数据</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 改进建议 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                    改进建议
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userProfile.weak_areas?.map((area, idx) => (
                      <div key={idx} className="p-3 bg-red-50 rounded-lg">
                        <h4 className="font-semibold text-red-900 mb-1">需要改进：{area}</h4>
                        <p className="text-sm text-red-800">
                          建议多练习相关内容，寻求AI导师的帮助
                        </p>
                      </div>
                    ))}
                    
                    {userProfile.strong_areas?.map((area, idx) => (
                      <div key={idx} className="p-3 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-1">保持优势：{area}</h4>
                        <p className="text-sm text-green-800">
                          继续发挥你在这个领域的优势
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {selectedTab === 'path' && (
            <motion.div
              key="path"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Route className="w-5 h-5 mr-2 text-purple-500" />
                    个性化学习路径
                  </CardTitle>
                  <CardDescription>
                    根据你的能力水平和学习目标定制的学习计划
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {learningPath.map((phase, phaseIdx) => (
                      <motion.div
                        key={phaseIdx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: phaseIdx * 0.2 }}
                        className="relative"
                      >
                        {/* 阶段标题 */}
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                            {phaseIdx + 1}
                          </div>
                          <h3 className="text-xl font-semibold">{phase.phase}</h3>
                        </div>

                        {/* 学习项目 */}
                        <div className="ml-11 space-y-3">
                          {phase.items.map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-white rounded-lg">
                                  {getContentTypeIcon(item.type)}
                                </div>
                                <div>
                                  <h4 className="font-medium">{item.title}</h4>
                                  <p className="text-sm text-gray-600">
                                    {getContentTypeName(item.type)}
                                  </p>
                                </div>
                              </div>
                              <Button size="sm" variant="outline">
                                开始
                              </Button>
                            </div>
                          ))}
                        </div>

                        {/* 连接线 */}
                        {phaseIdx < learningPath.length - 1 && (
                          <div className="w-0.5 h-6 bg-gray-300 ml-4 mt-4"></div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 刷新按钮 */}
        <div className="text-center mt-8">
          <Button onClick={fetchPersonalizedData} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            刷新推荐
          </Button>
        </div>
      </div>
    </div>
  )
}

