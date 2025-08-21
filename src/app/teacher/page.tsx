'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import TeacherDashboard from '@/components/teacher/Dashboard'
import Header from '@/components/layout/Header'
import LoginForm from '@/components/auth/LoginForm'

interface LocalUser {
  id: string
  email: string
  name: string
  role: 'student' | 'teacher'
  created_at: string
}

export default function TeacherPage() {
  const [user, setUser] = useState<LocalUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem('morning_star_auth')
      const userData = localStorage.getItem('morning_star_user')
      
      if (isAuth === 'true' && userData) {
        const parsedUser = JSON.parse(userData) as LocalUser
        if (parsedUser.role === 'teacher') {
          setUser(parsedUser)
        } else {
          // 如果是学生，重定向到学生页面
          router.push('/')
          return
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <TeacherDashboard />
    </div>
  )
}