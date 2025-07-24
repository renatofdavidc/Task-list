import User from "#models/user";

export interface UserType {
    name: string
    password: string
    email: string
}

export default class AuthService {
    async registerUser(username: string, email: string, password: string) {

        const user: UserType = await User.create({
            name: username,
            email: email,
            password: password
        })
        return user
    }

    async login(email: string, password: string) {
        if (!email || !password) {
            return {
                error: 'Email e senha são obrigatórios'
            }
        }
    }
}