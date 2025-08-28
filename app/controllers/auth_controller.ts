import type { HttpContext } from '@adonisjs/core/http'
import AuthService from '../service/auth_service.js'
import { loginValidator, registerUserValidator } from '#validators/auth_validator'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(registerUserValidator)
      const auth = new AuthService()
      const user = await auth.registerUser(payload.name, payload.email, payload.password)

      return response.created(user)
    } catch (error: any) {
      console.error('Register error:', error)
      return response.badRequest({ error: error.message })
    }
  }

  async login({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(loginValidator)
      const auth = new AuthService()

      const result = await auth.login(payload.email, payload.password)

      return response.ok(result)
    } catch (error: any) {
      console.error('Login error:', error)
      return response.unauthorized({ error: error.message })
    }
  }
}
