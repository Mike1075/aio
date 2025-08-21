'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User as UserIcon, LogOut } from 'lucide-react'

interface LocalUser {
  id: string
  email: string
  name: string
  role: 'student' | 'teacher'
  created_at: string
}

export default function Header() {
  const [user, setUser] = useState<LocalUser | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem('morning_star_auth')
      const userData = localStorage.getItem('morning_star_user')
      
      if (isAuth === 'true' && userData) {
        setUser(JSON.parse(userData) as LocalUser)
      }
    }

    checkAuth()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('morning_star_auth')
    localStorage.removeItem('morning_star_user')
    setUser(null)
    router.push('/login')
  }

  if (!user) return null

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-indigo-600">启明星平台</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <UserIcon className="h-5 w-5 text-gray-400" />
              <div className="flex flex-col">
                <span className="text-sm text-gray-700">{user.name}</span>
                <span className="text-xs text-gray-500">{user.role === 'teacher' ? '教师' : '学生'}</span>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              <LogOut className="h-4 w-4" />
              <span>退出</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}