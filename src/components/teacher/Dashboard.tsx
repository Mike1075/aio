'use client'

import { useState } from 'react'
import { Users, TrendingUp, AlertTriangle, BookOpen, Search } from 'lucide-react'

interface StudentRecord {
  id: string
  name: string
  studentId: string
  course: string
  progress: number
  lastActive: string
  avgScore: number
  status: 'excellent' | 'good' | 'warning' | 'risk'
}

export default function TeacherDashboard() {
  const [selectedCourse, setSelectedCourse] = useState('数据结构')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [messageContent, setMessageContent] = useState('')

  const courses = ['数据结构', '算法设计', '软件工程', 'Web开发']
  
  const [students] = useState<StudentRecord[]>([
    {
      id: '1',
      name: '张三',
      studentId: '2021001',
      course: '数据结构',
      progress: 85,
      lastActive: '2小时前',
      avgScore: 88,
      status: 'excellent'
    },
    {
      id: '2',
      name: '李四',
      studentId: '2021002',
      course: '数据结构',
      progress: 92,
      lastActive: '30分钟前',
      avgScore: 92,
      status: 'excellent'
    },
    {
      id: '3',
      name: '王五',
      studentId: '2021003',
      course: '数据结构',
      progress: 65,
      lastActive: '1天前',
      avgScore: 75,
      status: 'warning'
    },
    {
      id: '4',
      name: '赵六',
      studentId: '2021004',
      course: '数据结构',
      progress: 45,
      lastActive: '3天前',
      avgScore: 62,
      status: 'risk'
    },
    {
      id: '5',
      name: '钱七',
      studentId: '2021005',
      course: '数据结构',
      progress: 78,
      lastActive: '1小时前',
      avgScore: 82,
      status: 'good'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800'
      case 'good': return 'bg-blue-100 text-blue-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'risk': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'excellent': return '优秀'
      case 'good': return '良好'
      case 'warning': return '需关注'
      case 'risk': return '风险'
      default: return '未知'
    }
  }

  const filteredStudents = students.filter(student => 
    student.course === selectedCourse &&
    (student.name.includes(searchTerm) || student.studentId.includes(searchTerm))
  )

  const riskStudents = filteredStudents.filter(s => s.status === 'risk').length
  const warningStudents = filteredStudents.filter(s => s.status === 'warning').length
  const handleViewDetails = (student: StudentRecord) => {
    setSelectedStudent(student)
  }

  const handleSendMessage = (student: StudentRecord) => {
    setSelectedStudent(student)
    setShowMessageModal(true)
  }

  const handleSendMessageSubmit = () => {
    // 这里可以集成实际的消息发送功能
    alert(`消息已发送给 ${selectedStudent?.name}: ${messageContent}`)
    setShowMessageModal(false)
    setMessageContent('')
    setSelectedStudent(null)
  }

  const avgProgress = Math.round(filteredStudents.reduce((sum, s) => sum + s.progress, 0) / filteredStudents.length)
  const avgScore = Math.round(filteredStudents.reduce((sum, s) => sum + s.avgScore, 0) / filteredStudents.length)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">教师工作台</h1>
          <p className="mt-1 text-gray-600">查看和管理学生学习情况</p>
        </div>

        {/* Course Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">选择课程</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">总学生数</p>
                <p className="text-2xl font-bold text-gray-900">{filteredStudents.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">平均进度</p>
                <p className="text-2xl font-bold text-gray-900">{avgProgress}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">平均成绩</p>
                <p className="text-2xl font-bold text-gray-900">{avgScore}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">需关注学生</p>
                <p className="text-2xl font-bold text-gray-900">{riskStudents + warningStudents}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">学生列表</h2>
            <div className="flex items-center space-x-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="搜索学生姓名或学号..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Students Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    学生信息
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    学习进度
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    平均成绩
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    最后活跃
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.studentId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 max-w-xs">
                          <div className="text-sm text-gray-900 mb-1">{student.progress}%</div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-indigo-600 h-2 rounded-full"
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.avgScore}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(student.status)}`}>
                        {getStatusText(student.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleViewDetails(student)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        查看详情
                      </button>
                      <button 
                        onClick={() => handleSendMessage(student)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        发送消息
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 学生详情模态框 */}
        {selectedStudent && !showMessageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">学生详情</h3>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">姓名：</span>
                  <span className="text-sm text-gray-900">{selectedStudent.name}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">学号：</span>
                  <span className="text-sm text-gray-900">{selectedStudent.studentId}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">课程：</span>
                  <span className="text-sm text-gray-900">{selectedStudent.course}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">学习进度：</span>
                  <span className="text-sm text-gray-900">{selectedStudent.progress}%</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">平均成绩：</span>
                  <span className="text-sm text-gray-900">{selectedStudent.avgScore}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">最后活跃：</span>
                  <span className="text-sm text-gray-900">{selectedStudent.lastActive}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">状态：</span>
                  <span className={`text-sm px-2 py-1 rounded ${getStatusColor(selectedStudent.status)}`}>
                    {getStatusText(selectedStudent.status)}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => {
                    setShowMessageModal(true)
                  }}
                  className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  发送消息
                </button>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 发送消息模态框 */}
        {showMessageModal && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  发送消息给 {selectedStudent.name}
                </h3>
                <button
                  onClick={() => {
                    setShowMessageModal(false)
                    setSelectedStudent(null)
                    setMessageContent('')
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  消息内容
                </label>
                <textarea
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="请输入要发送的消息..."
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleSendMessageSubmit}
                  disabled={!messageContent.trim()}
                  className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  发送
                </button>
                <button
                  onClick={() => {
                    setShowMessageModal(false)
                    setSelectedStudent(null)
                    setMessageContent('')
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}