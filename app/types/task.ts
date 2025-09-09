export interface Task {
  id: number
  name: string
  description: string
  completed: boolean
  userId: number
  created_at?: Date
  updated_at?: Date
}