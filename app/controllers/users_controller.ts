import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
    public async ping({ response }: HttpContext) {
        try {
            return response.ok({
                hello: 'world'
            })
        } catch (error) {
            console.log('Deu ruim: ', error)
        }
    }
}