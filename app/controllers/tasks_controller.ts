import type { HttpContext } from '@adonisjs/core/http'
import TaskService from '../service/task_service.js'

export default class TasksController {
  public async create({ request, response }: HttpContext) {
  try {
    const { name, description } = request.all()
    const userId = request.input('authUserId')

    const taskService = new TaskService()
    const result = await taskService.createTask(name, description, userId)

    return response.created(result)
  } catch (error) {
    return response.internalServerError({ erro: 'Erro interno do servidor' })
  }
}
}
