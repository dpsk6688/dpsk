import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Search, 
  Target, 
  Lightbulb, 
  Play, 
  CheckCircle, 
  ArrowRight,
  Calculator,
  Briefcase,
  Home,
  BookOpen,
  Clock,
  Star
} from 'lucide-react'

export default function CaseAnalysis() {
  const [selectedCase, setSelectedCase] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const cases = [
    {
      id: 1,
      title: "长方体对角线问题",
      category: "数学",
      difficulty: "基础",
      description: "已知长方体的长宽高，求体对角线长度",
      icon: <Calculator className="w-6 h-6" />,
      problem: "已知一个长方体的长为5米，宽为3米，高为4米，求该长方体的体对角线长度。",
      steps: [
        {
          title: "理解问题",
          content: `
            **未知量：** 长方体的体对角线长度（设为x）
            
            **已知数据：**
            - 长方体的长：a = 5米
            - 长方体的宽：b = 3米  
            - 长方体的高：c = 4米
            
            **条件：** x是从长方体一个顶点到对角顶点的直线距离
            
            **画图理解：** 可以想象一个长方体，对角线是从一个角穿过中心到达最远角的线段。
          `,
          keyInsights: [
            "明确三维几何中的对角线概念",
            "识别已知的三个维度参数",
            "理解空间中的距离计算问题"
          ]
        },
        {
          title: "构思方案", 
          content: `
            **寻找相关问题：** 这让我想起了二维平面上求直角三角形斜边的问题，可以用勾股定理。
            
            **关键洞察：** 三维问题可以分解为两个二维问题
            
            **解题策略：**
            1. 先求底面对角线长度（二维问题）
            2. 再用底面对角线和高构成直角三角形求体对角线（二维问题）
            
            **引入辅助元素：** 构造直角三角形，将立体几何转化为平面几何
          `,
          keyInsights: [
            "将三维问题降维为二维问题",
            "利用勾股定理这个熟悉工具",
            "分步骤解决复杂问题"
          ]
        },
        {
          title: "执行方案",
          content: `
            **第一步：** 计算底面对角线长度
            底面是长为5米、宽为3米的长方形
            底面对角线 d = √(5² + 3²) = √(25 + 9) = √34 米
            
            **第二步：** 计算体对角线长度
            现在有一个直角三角形：
            - 一条直角边是底面对角线 d = √34 米
            - 另一条直角边是高 c = 4 米
            - 斜边就是体对角线 x
            
            **计算：** x = √(d² + c²) = √(34 + 16) = √50 = 5√2 ≈ 7.07 米
          `,
          keyInsights: [
            "严格按照计划执行",
            "每一步都有明确的数学依据",
            "计算过程清晰可验证"
          ]
        },
        {
          title: "回顾总结",
          content: `
            **验证结果：**
            - 检查特殊情况：如果是正方体（a=b=c=5），则对角线 = 5√3 ≈ 8.66米，符合预期
            - 维度检查：结果的量纲是长度，正确
            
            **其他解法：** 可以直接用三维勾股定理：x = √(a² + b² + c²)
            
            **方法推广：** 这种"降维"思想可以应用到更高维度的问题
            
            **经验总结：** 复杂的几何问题往往可以通过构造辅助图形来简化
          `,
          keyInsights: [
            "验证答案的合理性",
            "发现更简洁的解法",
            "总结可复用的思维模式"
          ]
        }
      ]
    },
    {
      id: 2,
      title: "项目延期问题",
      category: "工作",
      difficulty: "中级",
      description: "软件项目面临延期风险，如何制定应对策略",
      icon: <Briefcase className="w-6 h-6" />,
      problem: "你负责的软件开发项目原计划3个月完成，现在已经过去2个月，但只完成了50%的工作量。客户要求按时交付，团队士气低落。如何解决这个问题？",
      steps: [
        {
          title: "理解问题",
          content: `
            **未知量：** 如何在剩余1个月内完成项目并保证质量
            
            **已知数据：**
            - 原计划：3个月完成
            - 已用时间：2个月
            - 完成进度：50%
            - 剩余时间：1个月
            - 剩余工作量：50%
            - 约束条件：客户要求按时交付，团队士气低落
            
            **核心矛盾：** 按当前进度需要2个月才能完成剩余工作，但只有1个月时间
          `,
          keyInsights: [
            "明确时间和进度的矛盾",
            "识别多重约束条件",
            "理解问题的紧迫性"
          ]
        },
        {
          title: "构思方案",
          content: `
            **类似问题：** 这类似于资源调度和危机管理问题
            
            **可能的策略：**
            1. **范围调整：** 与客户协商，优先交付核心功能
            2. **资源增加：** 临时增加人手或外包部分工作
            3. **流程优化：** 并行开发，减少等待时间
            4. **质量权衡：** 先交付MVP，后续迭代完善
            
            **选择策略：** 综合考虑成本、质量、时间三要素，制定混合方案
          `,
          keyInsights: [
            "识别多种可能的解决路径",
            "考虑各种约束和权衡",
            "制定综合性解决方案"
          ]
        },
        {
          title: "执行方案",
          content: `
            **第一周：危机沟通**
            - 与客户坦诚沟通，重新定义MVP范围
            - 团队会议，重新分配任务，提升士气
            - 识别可以并行进行的工作
            
            **第二周：资源调配**
            - 临时增加2名开发人员
            - 将测试工作外包给专业团队
            - 简化部分非核心功能
            
            **第三周：冲刺交付**
            - 每日站会跟踪进度
            - 持续集成，及时发现问题
            - 准备演示和文档
            
            **第四周：验收和部署**
            - 客户验收核心功能
            - 部署到生产环境
            - 制定后续迭代计划
          `,
          keyInsights: [
            "分阶段执行计划",
            "持续沟通和调整",
            "关注关键里程碑"
          ]
        },
        {
          title: "回顾总结",
          content: `
            **结果评估：**
            - 按时交付了核心功能（80%的价值）
            - 客户满意度：良好
            - 团队学到了危机管理经验
            
            **经验教训：**
            - 项目初期应该更准确地估算工作量
            - 建立更好的进度监控机制
            - 与客户的沟通应该更加频繁和透明
            
            **方法推广：** 这种"分解-重组-优化"的思路可以应用到其他项目管理问题
          `,
          keyInsights: [
            "客观评估解决效果",
            "总结可复用的经验",
            "建立预防机制"
          ]
        }
      ]
    },
    {
      id: 3,
      title: "家庭理财规划",
      category: "生活",
      difficulty: "中级", 
      description: "月收入1万元的家庭如何制定理财计划",
      icon: <Home className="w-6 h-6" />,
      problem: "小王夫妇月收入共1万元，有一个3岁的孩子，目前租房居住。他们希望在5年内买房，同时为孩子准备教育基金，还要考虑养老储蓄。如何制定合理的理财计划？",
      steps: [
        {
          title: "理解问题",
          content: `
            **未知量：** 最优的资金分配方案
            
            **已知数据：**
            - 家庭月收入：10,000元
            - 家庭成员：夫妇 + 3岁孩子
            - 当前状态：租房
            - 目标1：5年内买房
            - 目标2：孩子教育基金
            - 目标3：养老储蓄
            
            **约束条件：**
            - 日常生活开支
            - 租房成本
            - 风险承受能力
          `,
          keyInsights: [
            "多目标优化问题",
            "时间跨度不同的需求",
            "风险和收益的平衡"
          ]
        },
        {
          title: "构思方案",
          content: `
            **类似问题：** 这是典型的多目标资产配置问题
            
            **理财原则：**
            1. **4321法则：** 40%投资、30%生活开支、20%储蓄、10%保险
            2. **时间分层：** 短期流动性、中期目标、长期增值
            3. **风险分散：** 不同风险等级的产品组合
            
            **策略框架：**
            - 紧急备用金：3-6个月生活费
            - 买房基金：定期储蓄 + 稳健投资
            - 教育基金：长期投资，复利增长
            - 养老储蓄：超长期投资，追求增值
          `,
          keyInsights: [
            "运用经典理财法则",
            "按时间维度分层规划",
            "平衡各种目标需求"
          ]
        },
        {
          title: "执行方案",
          content: `
            **月度资金分配（10,000元）：**
            
            **生活开支（4,000元）：**
            - 房租：2,000元
            - 食物：1,200元
            - 交通通讯：500元
            - 其他：300元
            
            **储蓄投资（5,000元）：**
            - 紧急备用金：500元（存款，6个月达到18,000元）
            - 买房基金：2,500元（定期存款 + 货币基金）
            - 教育基金：1,000元（股票基金定投）
            - 养老储蓄：1,000元（指数基金定投）
            
            **保险保障（1,000元）：**
            - 意外险、重疾险、寿险
          `,
          keyInsights: [
            "具体的资金分配方案",
            "不同目标匹配不同产品",
            "保险作为风险保障"
          ]
        },
        {
          title: "回顾总结",
          content: `
            **方案评估：**
            - 5年买房目标：首付款约15万元（2,500×60月=15万）
            - 教育基金：15年后约30万元（按年化8%计算）
            - 养老储蓄：30年后约360万元（按年化8%计算）
            
            **风险控制：**
            - 定期评估投资组合
            - 根据市场变化调整配置
            - 保持适当的流动性
            
            **经验总结：** 理财规划需要平衡短期需求和长期目标，关键是坚持执行和定期调整
          `,
          keyInsights: [
            "量化目标实现的可能性",
            "建立动态调整机制",
            "强调执行的重要性"
          ]
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <Search className="w-10 h-10 inline-block mr-3 text-green-600" />
            案例分析
          </h1>
          <p className="text-lg text-gray-600">
            通过真实案例学习波利亚四步法的实际应用
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 案例列表 */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>案例库</CardTitle>
                <CardDescription>选择一个案例进行分析</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cases.map((caseItem, index) => (
                  <motion.div
                    key={caseItem.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all ${
                        selectedCase === index 
                          ? 'ring-2 ring-green-500 bg-green-50' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => {
                        setSelectedCase(index)
                        setCurrentStep(0)
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {caseItem.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm mb-1">
                              {caseItem.title}
                            </h3>
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {caseItem.category}
                              </Badge>
                              <Badge 
                                variant={caseItem.difficulty === '基础' ? 'secondary' : 'default'}
                                className="text-xs"
                              >
                                {caseItem.difficulty}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600">
                              {caseItem.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* 案例内容 */}
          <div className="lg:col-span-3">
            <motion.div
              key={selectedCase}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* 问题描述 */}
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                      {cases[selectedCase].title}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">
                        {cases[selectedCase].category}
                      </Badge>
                      <Badge variant="secondary">
                        {cases[selectedCase].difficulty}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      问题描述
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {cases[selectedCase].problem}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 解题步骤 */}
              <Card>
                <CardHeader>
                  <CardTitle>解题过程</CardTitle>
                  <CardDescription>
                    按照波利亚四步法分析这个问题
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* 步骤导航 */}
                  <div className="flex justify-between mb-6">
                    {cases[selectedCase].steps.map((step, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setCurrentStep(index)}
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-white mb-2 transition-all ${
                            currentStep === index 
                              ? stepColors[index] + ' ring-4 ring-offset-2 ring-gray-300' 
                              : stepColors[index] + ' opacity-60'
                          }`}
                        >
                          {stepIcons[index]}
                        </motion.button>
                        <span className={`text-xs text-center ${
                          currentStep === index ? 'font-semibold' : 'text-gray-500'
                        }`}>
                          {step.title}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* 当前步骤内容 */}
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Tabs defaultValue="content" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="content">详细分析</TabsTrigger>
                        <TabsTrigger value="insights">关键洞察</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="content" className="mt-6">
                        <div className="prose prose-gray max-w-none">
                          {cases[selectedCase].steps[currentStep].content
                            .split('\n')
                            .map((paragraph, index) => (
                              paragraph.trim() && (
                                <div key={index} className="mb-4">
                                  {paragraph.trim().startsWith('**') ? (
                                    <h4 className="font-semibold text-gray-900 mb-2">
                                      {paragraph.replace(/\*\*/g, '')}
                                    </h4>
                                  ) : (
                                    <p className="text-gray-700 leading-relaxed">
                                      {paragraph.trim()}
                                    </p>
                                  )}
                                </div>
                              )
                            ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="insights" className="mt-6">
                        <div className="space-y-3">
                          {cases[selectedCase].steps[currentStep].keyInsights.map((insight, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center p-3 bg-green-50 rounded-lg"
                            >
                              <Star className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                              <span className="text-gray-700">{insight}</span>
                            </motion.div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>

                    {/* 导航按钮 */}
                    <div className="flex justify-between mt-8">
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                        disabled={currentStep === 0}
                      >
                        上一步
                      </Button>
                      <Button 
                        onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                        disabled={currentStep === 3}
                      >
                        下一步
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

