import Task from '#models/task'
import TaskDAO from '../DAO/task_dao.js'

export default class TaskService {
  private taskDao = new TaskDAO()

  async createTask(name: string, description: string, userId: number): Promise<Task> {
    const result = await this.taskDao.insertNewTask(name, description, userId)
    return result
  }

  async completeTask(taskId: number, userId: number): Promise<{ success: boolean }> {
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
  }

  async getTasksByUser(userId: number): Promise<Task[]> {
    const tasks = await Task.query().where('userId', userId)
    return tasks
  }

  async updateTask(
    taskId: number,
    userId: number,
    taskName?: string,
    description?: string
  ): Promise<Task> {
    const taskExists = await this.taskDao.taskExists(taskId)

    if (!taskExists) {
      throw new Error('Task não encontrada')
    }

    const taskBelongsToUser = await this.taskDao.taskBelongsToUser(taskId, userId)

    if (!taskBelongsToUser) {
      throw new Error('Task não pertence ao usuário')
    }

    const task = await this.taskDao.updateTask(taskId, userId, taskName, description)

    return task
  }
}
