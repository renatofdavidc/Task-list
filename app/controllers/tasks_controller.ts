import type { HttpContext } from '@adonisjs/core/http'
import TaskService from '../service/task_service.js'
import { createTaskValidator } from '#validators/task'

export default class TasksController {
  public async create({ request, response }: HttpContext) {
    try {
      const taskService = new TaskService()

      const payload = await request.validateUsing(createTaskValidator)

      const result = await taskService.createTask(payload.name, payload.description, 1)

      return response.ok(result)
    } catch (error) {
      console.error('Erro: ', error)
      return response.internalServerError({
        erro: 'Erro interno do servidor',
      })
    }
  }
}
