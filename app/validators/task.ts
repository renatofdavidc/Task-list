import vine from '@vinejs/vine'

export const createTaskValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(0).maxLength(200),
    description: vine.string().trim().minLength(0).maxLength(5000),
  })
)
