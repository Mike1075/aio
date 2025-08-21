'use client'

import { useState, useEffect } from 'react'
import { BookOpen, Calendar, MessageCircle, TrendingUp, Clock } from 'lucide-react'
import ChatAssistant from './ChatAssistant'
import LearningPlan from './LearningPlan'

interface LearningProgress {
  courseName: string
  progress: number
  nextDeadline: string
}

export default function StudentDashboard() {
  const [learningProgress, setLearningProgress] = useState<LearningProgress[]>([
    { courseName: '数据结构', progress: 75, nextDeadline: '2025-08-25' },
    { courseName: '算法设计', progress: 60, nextDeadline: '2025-08-27' },
    { courseName: '软件工程', progress: 85, nextDeadline: '2025-08-30' },
  ])

  const [todayTasks] = useState([
    '完成数据结构第5章练习',
    '复习算法设计课程内容',
    '准备软件工程项目演示',
  ])

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Navigation */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900">学生工作台</h2>
        </div>
        <nav className="mt-6">
          <div className="px-3">
            <ul className="space-y-2">
              <li>
                <a href="#" className="bg-indigo-50 text-indigo-700 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
                  <BookOpen className="mr-3 h-5 w-5" />
                  学习概览
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
                  <Calendar className="mr-3 h-5 w-5" />
                  课程安排
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
                  <TrendingUp className="mr-3 h-5 w-5" />
                  学习报告
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Center - Main Dashboard */}
        <div className="flex-1 p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">欢迎回来！</h1>
            <p className="mt-1 text-gray-600">今天也要加油学习哦~ 🌟</p>
          </div>

          {/* Learning Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">学习进度</h3>
              <div className="space-y-4">
                {learningProgress.map((course, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">{course.courseName}</span>
                      <span className="text-sm text-gray-500">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center mt-1">
                      <Clock className="h-3 w-3 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">截止时间: {course.nextDeadline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">今日任务</h3>
              <div className="space-y-3">
                {todayTasks.map((task, index) => (
                  <div key={index} className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                    <span className="ml-3 text-sm text-gray-700">{task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BookOpen className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">本周学习时长</p>
                  <p className="text-2xl font-bold text-gray-900">12.5 小时</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">平均成绩</p>
                  <p className="text-2xl font-bold text-gray-900">85.6</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">待完成任务</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Plan */}
          <LearningPlan />
        </div>

        {/* Right Sidebar - AI Assistant */}
        <div className="w-80 bg-white border-l border-gray-200">
          <ChatAssistant />
        </div>
      </div>
    </div>
  )
}