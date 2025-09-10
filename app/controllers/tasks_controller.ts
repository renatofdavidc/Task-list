import type { HttpContext } from '@adonisjs/core/http'
import TaskService from '../service/task_service.js'
import { createTaskValidator, updateTaskValidator } from '#validators/task'

export default class TasksController {

  private taskService = new TaskService()

  public async create({ request, response }: HttpContext) {
    try {
      const userId = (request as any).authUserId
      if (!userId) {
        return response.unauthorized({ error: 'Usuário não autenticado' })
      }

      const payload = await request.validateUsing(createTaskValidator)

      const task = await this.taskService.createTask(payload.name, payload.description, userId)

      return response.created({ task })
    } catch (error) {
      console.error('Create task error:', error)
      return response.internalServerError({
        error: 'Erro interno do servidor',
        detail: error.message,
      })
    }
  }

  public async complete({ request, response }: HttpContext) {
    try {
      const { id } = request.params()
      const userId = (request as any).authUserId
      if (!userId) {
        return response.unauthorized({ error: 'Usuário não autenticado' })
      }

      const result = await this.taskService.completeTask(id, userId)

      return response.ok(result)
    } catch (error: any) {
      if (error.message.includes('Task não encontrada')) {
        return response.notFound({ error: error.message })
      }
      console.error('Complete task error:', error)
      return response.internalServerError({
        error: 'Erro interno do servidor',
        detail: error.message,
      })
    }
  }

  public async getTasksByUser({ request, response }: HttpContext) {
    try {
      const userId = (request as any).authUserId
      if (!userId) {
        return response.unauthorized({ error: 'Usuário não autenticado' })
      }

      const result = await this.taskService.getTasksByUser(userId)

      return response.ok(result)
    } catch (error) {
      return response.internalServerError({
        error: 'Erro interno do servidor',
        detail: error.message,
      })
    }
  }

  public async updateTask({ request, response }: HttpContext) {
    try {
      const { id } = request.params()
      const payload = await request.validateUsing(updateTaskValidator)
      const userId = (request as any).authUserId
      if (!userId) {
        return response.unauthorized({ error: 'Usuário não autenticado' })
      }

      const result = await this.taskService.updateTask(id, userId, payload.name, payload.description)

      return response.ok(result)
    } catch (error) {
      return response.internalServerError({
        error: 'Erro interno do servidor',
        detail: error.message,
      })
    }
  }
}
