import { UsersDbRepository } from "@/auth/lib/repositories/UsersDbRepository"
import { NoUserFoundError } from "@/auth/lib/errors/NoUserFoundError"
import { PasswordsDontMatch } from "@/auth/lib/errors/PasswordsDontMatch"
import { User } from "@/auth/lib/models/User"
import { LoginCredentials, RegisterArgs } from "@/auth/lib/types/AuthenticationTypes"
import { UserAlreadyExists } from "@/auth/lib/errors/UserAlreadyExists"

export type AuthenticationServiceDependencies = {
    dbRepository: UsersDbRepository;
}

export interface AuthenticationService {
    authenticate: (credentials: LoginCredentials) => Promise<User>;
    register: (user: RegisterArgs) => Promise<User | null>;
}

export const createAuthenticationService = (dependencies: AuthenticationServiceDependencies): AuthenticationService => {
    const authenticate = async (credentials: LoginCredentials) => {
        const { email, password } = credentials
        const user = await dependencies.dbRepository.getUserByEmail(email)

        if (!user) {
            throw new NoUserFoundError()
        }

        const passwordMatches = await user.comparePassword(password)
        if (!passwordMatches) {
            throw new PasswordsDontMatch()
        }

        return user
    }

    const register = async (credentials: RegisterArgs) => {
        const user = await dependencies.dbRepository.getUserByEmail(credentials.email)

        if (user) {
            throw new UserAlreadyExists()
        } else {
            return dependencies.dbRepository.createUser(User.fromJson(credentials), credentials)
        }
    }

    return {
        authenticate,
        register,
    }
}