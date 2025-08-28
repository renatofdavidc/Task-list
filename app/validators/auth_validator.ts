import vine from "@vinejs/vine";

export const registerUserValidator = vine.compile(
    vine.object({
        name: vine.string().trim().minLength(1).maxLength(200),
        email: vine.string().email().trim().minLength(1).maxLength(200),
        password: vine.string().trim().minLength(1).maxLength(200)
    })
)

export const loginValidator = vine.compile(
    vine.object({
        email: vine.string().email().trim().minLength(1).maxLength(200),
        password: vine.string().trim().minLength(1).maxLength(200)
    })
)