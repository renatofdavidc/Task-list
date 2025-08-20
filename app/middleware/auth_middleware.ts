import type { HttpContext } from '@adonisjs/core/http'
import jwt from 'jsonwebtoken'
import env from '#start/env'

export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: () => Promise<void>) {
    const authHeader = ctx.request.header('Authorization')

    if (!authHeader) {
      return ctx.response.unauthorized({ error: 'Token não fornecido' })
    }

    try {
      const [, token] = authHeader.split(' ')
      const payload = jwt.verify(token, env.get('APP_KEY')) as { userId: number }
      ctx.request.updateBody({ authUserId: payload.userId })
      await next()
    } catch {
      return ctx.response.unauthorized({ error: 'Token inválido ou expirado' })
    }
  }
}
