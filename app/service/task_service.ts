import db from "@adonisjs/lucid/services/db"

export interface Task {
  id: number
  name: string
  description: string
  completed: boolean
  userId: number
  created_at?: Date
  updated_at?: Date
}

export default class TaskService {
  async createTask(name: string, description: string, userId: number): Promise<Task> {
    const [row] = await db.table('tasks')
      .returning(['id', 'name', 'description', 'completed', 'user_id as userId', 'created_at', 'updated_at'])
      .insert({
        name,
        description,
        user_id: userId,
        completed: false
      })

    return row as Task
  }

  async completeTask(taskId: number, userId: number): Promise<{success: boolean}> {

    

    return { success: true }
  }
}
