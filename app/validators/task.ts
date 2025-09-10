import vine from '@vinejs/vine'

export const createTaskValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(200),
    description: vine.string().trim().minLength(1).maxLength(5000),
  })
)
export const updateTaskValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(200).optional(),
    description: vine.string().trim().minLength(1).maxLength(5000).optional()
  })
)

