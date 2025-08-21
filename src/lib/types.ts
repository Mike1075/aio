export interface User {
  id: string
  email: string
  name: string
  role: 'student' | 'teacher' | 'admin'
  avatar_url?: string
  created_at: string
}

export interface Student {
  id: string
  user_id: string
  student_id: string
  major: string
  grade: number
  class_name: string
  enrollment_year: number
}

export interface Teacher {
  id: string
  user_id: string
  teacher_id: string
  department: string
  title: string
}

export interface Course {
  id: string
  name: string
  code: string
  description?: string
  credits: number
  teacher_id: string
  semester: string
  year: number
}

export interface Enrollment {
  id: string
  student_id: string
  course_id: string
  status: 'active' | 'completed' | 'dropped'
  enrolled_at: string
}

export interface Assignment {
  id: string
  course_id: string
  title: string
  description?: string
  due_date: string
  max_score: number
  created_at: string
}

export interface Grade {
  id: string
  student_id: string
  assignment_id: string
  score: number
  feedback?: string
  graded_at: string
}

export interface LearningPath {
  id: string
  student_id: string
  title: string
  description?: string
  goals: string[]
  current_step: number
  total_steps: number
  created_by_ai: boolean
  created_at: string
  updated_at: string
}

export interface ChatMessage {
  id: string
  user_id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: string
  context?: any
}

export interface KnowledgeChunk {
  id: string
  content: string
  metadata: Record<string, any>
  embedding?: number[]
  created_at: string
}