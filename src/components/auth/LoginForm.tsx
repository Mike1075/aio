'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // 暂时简化登录流程 - 支持任意邮箱密码用于测试
      if (email && password) {
        // 创建临时用户数据
        const userData = {
          email,
          name: email.split('@')[0], // 使用邮箱前缀作为姓名
          role: email.includes('teacher') || email.includes('admin') ? 'teacher' : 'student',
          id: Date.now().toString(),
          created_at: new Date().toISOString()
        }
        
        localStorage.setItem('morning_star_user', JSON.stringify(userData))
        localStorage.setItem('morning_star_auth', 'true')
        
        // 根据邮箱判断角色进行跳转
        if (userData.role === 'teacher') {
          router.push('/teacher')
        } else {
          router.push('/')
        }
      } else {
        setError('请输入邮箱和密码')
      }
    } catch {
      setError('登录失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-indigo-600 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            启明星平台
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            AI驱动智慧学习与管理平台
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
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
              placeholder="如: student@test.com 或 teacher@test.com"
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
              placeholder="任意密码即可(测试模式)"
            />
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
            {loading ? '登录中...' : '登录'}
          </button>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              还没有账户？
              <a
                href="/register"
                className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
              >
                立即注册
              </a>
            </span>
          </div>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 mb-2">测试账户示例</h3>
          <div className="text-xs text-blue-700 space-y-1">
            <div><strong>学生账户:</strong> student@test.com (任意密码)</div>
            <div><strong>教师账户:</strong> teacher@test.com (任意密码)</div>
            <div className="mt-2 text-blue-600">
              💡 邮箱包含&quot;teacher&quot;的将自动识别为教师角色
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}