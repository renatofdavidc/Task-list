import Task from "#models/task"
import TaskDAO from "../DAO/task_dao.js"

export default class TaskService {
  private taskDao = new TaskDAO()
  
  async createTask(name: string, description: string, userId: number): Promise<Task> {
    const result = await this.taskDao.insertNewTask(name, description, userId)
    return result
  }

  async completeTask(taskId: number, userId: number): Promise<{ success: boolean }> {
    try {
      const taskExists = await this.taskDao.taskExists(taskId)
      
      if (!taskExists) {
        throw new Error('Task não encontrada')
      }

      const taskBelongsToUser = await this.taskDao.taskBelongsToUser(taskId, userId)
      
      if (!taskBelongsToUser) {
        throw new Error('Task não pertence ao usuário')
      }

      await this.taskDao.completeTask(taskId, userId)
      return { success: true }
    } catch (error) {
      throw error
    }
  }

  async getTasksByUser(userId: number): Promise<Task[]> {
    const tasks = await Task.query().where('userId', userId)
    return tasks
  }

}
