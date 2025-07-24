import type { HttpContext } from '@adonisjs/core/http'
import AuthService from '../service/auth_service.js'

export default class AuthController {

    async register({ request, response }: HttpContext) {
        
        try {
            const auth = new AuthService()
            const { name, email, password } = request.all()

            const user = await auth.registerUser(name, email, password)

            return response.ok(user)
        } catch (error) {
            console.log(error)
        }
    }

    // async login({ request, response }: HttpContext) {
        
    // }
}