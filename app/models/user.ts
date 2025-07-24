import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { Hash } from '@adonisjs/core/hash'
import { Argon } from '@adonisjs/core/hash/drivers/argon'

export default class User extends BaseModel {

  @beforeSave()
  static async hashPassword(user: User) {
    const hash = new Hash(new Argon({}))
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }

  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare name: string
  
  @column()
  declare email: string

  @column()
  declare password: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}