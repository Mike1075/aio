'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserPlus, GraduationCap, BookOpen } from 'lucide-react'

export default function RegisterForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState<'student' | 'teacher'>('student')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // 暂时简化注册流程 - 直接存储到localStorage用于测试
      const userData = {
        email,
        name,
        role,
        id: Date.now().toString(),
        created_at: new Date().toISOString()
      }
      
      localStorage.setItem('morning_star_user', JSON.stringify(userData))
      localStorage.setItem('morning_star_auth', 'true')
      
      // 根据角色跳转到相应页面
      if (role === 'teacher') {
        router.push('/teacher')
      } else {
        router.push('/')
      }
    } catch {
      setError('注册失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-indigo-600 rounded-full flex items-center justify-center">
            <UserPlus className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            加入启明星平台
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            创建您的账户开始AI学习之旅
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              姓名
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="请输入您的姓名"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              邮箱地址
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="请输入邮箱地址(测试可随意填写)"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              密码
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="请输入密码(测试可随意填写)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              选择您的身份
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex flex-col items-center p-4 border-2 rounded-lg transition-all ${
                  role === 'student'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                }`}
              >
                <GraduationCap className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">学生</span>
              </button>
              
              <button
                type="button"
                onClick={() => setRole('teacher')}
                className={`flex flex-col items-center p-4 border-2 rounded-lg transition-all ${
                  role === 'teacher'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                }`}
              >
                <BookOpen className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">教师</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? '注册中...' : '立即注册'}
          </button>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              已有账户？
              <button
                type="button"
                onClick={() => router.push('/login')}
                className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
              >
                立即登录
              </button>
            </span>
          </div>
        </form>

        <div className="mt-6 p-4 bg-yellow-50 rounded-md">
          <p className="text-xs text-yellow-800">
            <strong>测试模式:</strong> 当前为MVP测试版本，可以使用任意邮箱和密码注册。正式版本将连接Supabase进行真实认证。
          </p>
        </div>
      </div>
    </div>
  )
}