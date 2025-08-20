import User from '#models/user'
import Hash from '@adonisjs/core/services/hash'
import jwt from 'jsonwebtoken'
import env from '#start/env'

export default class AuthService {
  async registerUser(name: string, email: string, password: string) {
    const user = await User.create({ name, email, password })
    return user
  }

  async login(email: string, password: string) {
    const user = await User.findBy('email', email)
    if (!user) throw new Error('Credenciais inválidas')

    const isValid = await Hash.verify(user.password, password)
    if (!isValid) throw new Error('Credenciais inválidas')

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      env.get('APP_KEY'),
      { expiresIn: '1d' }
    )

    return { token, user }
  }
}
