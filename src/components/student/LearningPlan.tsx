'use client'

import { useState } from 'react'
import { Calendar, Clock, CheckCircle2, Target, Book } from 'lucide-react'

interface LearningGoal {
  id: string
  title: string
  description: string
  progress: number
  dueDate: string
  priority: 'high' | 'medium' | 'low'
  category: string
}

export default function LearningPlan() {
  const [goals] = useState<LearningGoal[]>([
    {
      id: '1',
      title: '掌握链表数据结构',
      description: '理解单链表、双链表的原理和实现',
      progress: 75,
      dueDate: '2025-08-25',
      priority: 'high',
      category: '数据结构'
    },
    {
      id: '2',
      title: '学习动态规划算法',
      description: '掌握动态规划的基本思想和经典问题',
      progress: 40,
      dueDate: '2025-08-30',
      priority: 'medium',
      category: '算法设计'
    },
    {
      id: '3',
      title: '完成软件工程项目',
      description: '按照软件工程流程完成团队项目',
      progress: 60,
      dueDate: '2025-09-05',
      priority: 'high',
      category: '软件工程'
    },
    {
      id: '4',
      title: '学习React Hooks',
      description: '掌握useState、useEffect等常用Hooks',
      progress: 20,
      dueDate: '2025-09-10',
      priority: 'low',
      category: 'Web开发'
    }
  ])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return '高优先级'
      case 'medium': return '中优先级'
      case 'low': return '低优先级'
      default: return '未知'
    }
  }

  const completedGoals = goals.filter(goal => goal.progress === 100).length
  const totalGoals = goals.length
  const overallProgress = Math.round((goals.reduce((sum, goal) => sum + goal.progress, 0) / totalGoals))

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Target className="h-6 w-6 text-indigo-600 mr-2" />
          我的学习计划
        </h2>
        <div className="text-sm text-gray-600">
          已完成 {completedGoals}/{totalGoals} 个目标
        </div>
      </div>

      {/* 总体进度 */}
      <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-indigo-700">总体进度</span>
          <span className="text-sm text-indigo-600">{overallProgress}%</span>
        </div>
        <div className="w-full bg-indigo-200 rounded-full h-3">
          <div 
            className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>

      {/* 学习目标列表 */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">{goal.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{goal.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Book className="h-3 w-3 mr-1" />
                    {goal.category}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    截止: {goal.dueDate}
                  </div>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(goal.priority)}`}>
                {getPriorityText(goal.priority)}
              </div>
            </div>

            {/* 进度条 */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600">进度</span>
                <span className="text-xs text-gray-600">{goal.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    goal.progress === 100 ? 'bg-green-500' : 'bg-indigo-500'
                  }`}
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {goal.progress === 100 ? (
                  <div className="flex items-center text-green-600 text-sm">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    已完成
                  </div>
                ) : (
                  <div className="flex items-center text-indigo-600 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    进行中
                  </div>
                )}
              </div>
              <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                查看详情
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 添加新目标按钮 */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors">
          + 添加新的学习目标
        </button>
      </div>
    </div>
  )
}