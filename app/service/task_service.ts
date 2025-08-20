import db from "@adonisjs/lucid/services/db"

export interface Task {
  name: string
  description: string
  completed: boolean
  userId: number
}

export default class TaskService {
  async createTask(name: string, description: string, userId: number): Promise<Task[]> {
    const task = await db.table('tasks')
      .returning('id')
      .insert({
        name: name,
        description: description,
        user_id: userId
      })

    return task
  }
}
