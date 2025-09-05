import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts'
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Clock,
  Trophy,
  Brain,
  Users,
  Calendar,
  Zap,
  Star
} from 'lucide-react'

export default function DataVisualization() {
  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('30days')

  // 模拟数据 - 在实际应用中这些数据会从API获取
  const overviewStats = {
    totalProblems: 127,
    successRate: 85,
    averageTime: 12.5,
    streakDays: 7,
    skillLevel: 4.8
  }

  const dailyProgressData = [
    { date: '12-01', completed: 3, time: 45, score: 85 },
    { date: '12-02', completed: 5, time: 62, score: 92 },
    { date: '12-03', completed: 2, time: 28, score: 78 },
    { date: '12-04', completed: 4, time: 51, score: 88 },
    { date: '12-05', completed: 6, time: 73, score: 94 },
    { date: '12-06', completed: 3, time: 39, score: 82 },
    { date: '12-07', completed: 5, time: 58, score: 90 }
  ]

  const problemTypeData = [
    { type: '数学', count: 45, avgTime: 15.2, successRate: 88 },
    { type: '逻辑', count: 32, avgTime: 18.7, successRate: 82 },
    { type: '工作', count: 28, avgTime: 22.1, successRate: 79 },
    { type: '生活', count: 22, avgTime: 12.8, successRate: 91 }
  ]

  const skillRadarData = [
    { skill: '理解问题', current: 4.5, target: 5.0 },
    { skill: '构思方案', current: 4.2, target: 5.0 },
    { skill: '执行方案', current: 4.8, target: 5.0 },
    { skill: '回顾总结', current: 4.1, target: 5.0 }
  ]

  const learningTimeData = [
    { hour: '08:00', sessions: 2 },
    { hour: '10:00', sessions: 5 },
    { hour: '14:00', sessions: 8 },
    { hour: '16:00', sessions: 12 },
    { hour: '19:00', sessions: 15 },
    { hour: '21:00', sessions: 10 },
    { hour: '22:00', sessions: 6 }
  ]

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

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
            <BarChart3 className="w-10 h-10 inline-block mr-3 text-indigo-600" />
            数据分析
          </h1>
          <p className="text-lg text-gray-600">
            深入了解你的学习进度和解题能力发展轨迹
          </p>
        </motion.div>

        {/* 时间范围选择 */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-sm">
            {[
              { key: '7days', label: '最近7天' },
              { key: '30days', label: '最近30天' },
              { key: '90days', label: '最近3个月' },
              { key: 'all', label: '全部时间' }
            ].map((range) => (
              <Button
                key={range.key}
                variant={timeRange === range.key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeRange(range.key)}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">总览</TabsTrigger>
            <TabsTrigger value="progress">学习进度</TabsTrigger>
            <TabsTrigger value="skills">技能分析</TabsTrigger>
            <TabsTrigger value="patterns">学习模式</TabsTrigger>
          </TabsList>

          {/* 总览标签页 */}
          <TabsContent value="overview" className="space-y-6">
            {/* 关键指标卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">解题总数</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{overviewStats.totalProblems}</div>
                    <p className="text-xs text-muted-foreground">
                      +12 较上周
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">成功率</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{overviewStats.successRate}%</div>
                    <Progress value={overviewStats.successRate} className="mt-2" />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">平均用时</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">{overviewStats.averageTime}分钟</div>
                    <p className="text-xs text-muted-foreground">
                      -2.3分钟 较上周
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">连续天数</CardTitle>
                    <Zap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">{overviewStats.streakDays}天</div>
                    <p className="text-xs text-muted-foreground">
                      保持学习习惯
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">技能评分</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">{overviewStats.skillLevel}</div>
                    <div className="flex mt-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-3 h-3 ${star <= Math.floor(overviewStats.skillLevel) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* 问题类型分布 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>问题类型分布</CardTitle>
                  <CardDescription>不同类型问题的解题数量</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={problemTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ type, count }) => `${type}: ${count}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {problemTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>成功率对比</CardTitle>
                  <CardDescription>各类型问题的解题成功率</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={problemTypeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="successRate" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 学习进度标签页 */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>每日完成情况</CardTitle>
                  <CardDescription>最近一周的学习活动</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dailyProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="completed" stroke="#3B82F6" name="完成题目" />
                      <Line type="monotone" dataKey="score" stroke="#10B981" name="平均分数" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>学习时间分布</CardTitle>
                  <CardDescription>每日学习时间变化</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dailyProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="time" fill="#F59E0B" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* 学习里程碑 */}
            <Card>
              <CardHeader>
                <CardTitle>学习里程碑</CardTitle>
                <CardDescription>你的学习成就和进步轨迹</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: '首次完成练习', date: '2024-11-15', icon: <Target className="w-5 h-5" /> },
                    { title: '连续学习7天', date: '2024-11-22', icon: <Calendar className="w-5 h-5" /> },
                    { title: '解题成功率达到80%', date: '2024-11-28', icon: <Trophy className="w-5 h-5" /> },
                    { title: '完成100道题目', date: '2024-12-01', icon: <Star className="w-5 h-5" /> }
                  ].map((milestone, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                        {milestone.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{milestone.title}</h4>
                        <p className="text-sm text-gray-600">{milestone.date}</p>
                      </div>
                      <Badge variant="secondary">已达成</Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 技能分析标签页 */}
          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>四步法技能雷达图</CardTitle>
                  <CardDescription>各项技能的当前水平和目标对比</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={skillRadarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="skill" />
                      <PolarRadiusAxis angle={90} domain={[0, 5]} />
                      <Radar name="当前水平" dataKey="current" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                      <Radar name="目标水平" dataKey="target" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>技能提升建议</CardTitle>
                  <CardDescription>基于你的表现提供个性化建议</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        skill: '回顾总结',
                        level: 4.1,
                        suggestion: '多花时间思考不同解法，总结可复用的思维模式',
                        priority: 'high'
                      },
                      {
                        skill: '构思方案',
                        level: 4.2,
                        suggestion: '加强类比思维训练，多练习从已知问题中寻找灵感',
                        priority: 'medium'
                      },
                      {
                        skill: '理解问题',
                        level: 4.5,
                        suggestion: '继续保持，可以尝试更复杂的问题类型',
                        priority: 'low'
                      }
                    ].map((item, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{item.skill}</h4>
                          <Badge 
                            variant={item.priority === 'high' ? 'destructive' : item.priority === 'medium' ? 'default' : 'secondary'}
                          >
                            {item.priority === 'high' ? '优先' : item.priority === 'medium' ? '中等' : '良好'}
                          </Badge>
                        </div>
                        <Progress value={item.level * 20} className="mb-2" />
                        <p className="text-sm text-gray-600">{item.suggestion}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 学习模式标签页 */}
          <TabsContent value="patterns" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>学习时间偏好</CardTitle>
                  <CardDescription>一天中不同时段的学习活跃度</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={learningTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sessions" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>学习习惯分析</CardTitle>
                  <CardDescription>你的学习模式特征</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">🌅 早起型学习者</h4>
                      <p className="text-blue-800 text-sm">
                        你在上午时段学习效率最高，建议将重要的学习任务安排在早上。
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">📈 稳步提升型</h4>
                      <p className="text-green-800 text-sm">
                        你的学习进度稳定上升，保持当前的学习节奏会有很好的效果。
                      </p>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-900 mb-2">🎯 目标导向型</h4>
                      <p className="text-orange-800 text-sm">
                        你倾向于专注解决特定类型的问题，建议适当增加问题类型的多样性。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 学习建议 */}
            <Card>
              <CardHeader>
                <CardTitle>个性化学习建议</CardTitle>
                <CardDescription>基于你的学习数据提供的专属建议</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: '增加练习频率',
                      description: '建议每天至少完成3道练习题，保持学习连续性',
                      icon: <Calendar className="w-5 h-5" />,
                      color: 'blue'
                    },
                    {
                      title: '挑战更难题目',
                      description: '你的基础很扎实，可以尝试更有挑战性的问题',
                      icon: <TrendingUp className="w-5 h-5" />,
                      color: 'green'
                    },
                    {
                      title: '加强反思总结',
                      description: '多花时间在第四步，这会显著提升你的解题能力',
                      icon: <Brain className="w-5 h-5" />,
                      color: 'purple'
                    }
                  ].map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 border rounded-lg bg-${suggestion.color}-50 border-${suggestion.color}-200`}
                    >
                      <div className={`p-2 bg-${suggestion.color}-100 rounded-full w-fit mb-3 text-${suggestion.color}-600`}>
                        {suggestion.icon}
                      </div>
                      <h4 className={`font-semibold text-${suggestion.color}-900 mb-2`}>
                        {suggestion.title}
                      </h4>
                      <p className={`text-sm text-${suggestion.color}-800`}>
                        {suggestion.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

