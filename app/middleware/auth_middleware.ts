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
      const [scheme, token] = authHeader.split(' ')
      if (scheme !== 'Bearer' || !token) {
        return ctx.response.unauthorized({ error: 'Formato de token inválido' })
      }
      const payload = jwt.verify(token, env.get('APP_KEY')) as { userId: number }
      ;(ctx.request as any).authUserId = payload.userId
      await next()
    } catch (err) {
      console.error('Auth error:', err)
      return ctx.response.unauthorized({ error: 'Token inválido ou expirado' })
    }
  }
}
