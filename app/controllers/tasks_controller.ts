import type { HttpContext } from '@adonisjs/core/http'
import TaskService from '../service/task_service.js'
import { createTaskValidator } from '#validators/task'

export default class TasksController {
  public async create({ request, response }: HttpContext) {
    try {
      const userId = (request as any).authUserId
      if (!userId) {
        return response.unauthorized({ error: 'Usuário não autenticado' })
      }

      const payload = await request.validateUsing(createTaskValidator)

      const taskService = new TaskService()
      const task = await taskService.createTask(payload.name, payload.description, userId)

      return response.created({ task })
    } catch (error) {
      console.error('Create task error:', error)
      return response.internalServerError({ error: 'Erro interno do servidor', detail: error.message })
    }
  }

  public async complete({ request, response }: HttpContext) {
    try {
      const { id } = request.params()
      const userId = (request as any).authUserId
      if (!userId) {
        return response.unauthorized({ error: 'Usuário não autenticado' })
      }

      const taskService = new TaskService()
      const result = await taskService.completeTask(id, userId)

      return response.ok(result)
    } catch (error: any) {
      if (error.message.includes('Task não encontrada')) {
        return response.notFound({ error: error.message })
      }
      console.error('Complete task error:', error)
      return response.internalServerError({ error: 'Erro interno do servidor', detail: error.message })
    }
  }

}
