'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import StudentDashboard from '@/components/student/Dashboard'
import LoginForm from '@/components/auth/LoginForm'

interface LocalUser {
  id: string
  email: string
  name: string
  role: 'student' | 'teacher'
  created_at: string
}

export default function Home() {
  const [user, setUser] = useState<LocalUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem('morning_star_auth')
      const userData = localStorage.getItem('morning_star_user')
      
      if (isAuth === 'true' && userData) {
        const parsedUser = JSON.parse(userData) as LocalUser
        setUser(parsedUser)
        
        // 如果是教师，重定向到教师页面
        if (parsedUser.role === 'teacher') {
          router.push('/teacher')
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
      <StudentDashboard />
    </div>
  )
}
