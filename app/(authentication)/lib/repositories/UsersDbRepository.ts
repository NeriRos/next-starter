import { User } from "@/app/(authentication)/lib/models/User"
import prisma from "@/app/_core/lib/prisma"
import { LoginCredentials } from "@/app/(authentication)/lib/types/AuthenticationTypes"

export interface UsersDbRepository {
    getUsers: () => Promise<User[]>;
    getUserByEmail: (email: string) => Promise<User | null>;
    createUser: (user: User, credentials: LoginCredentials) => Promise<User | null>;
}

export const createUsersDbRepository = (): UsersDbRepository => {
    const getUsers = async () => {
        const users = await prisma.user.findMany()

        return users.map((user) => User.fromJson(user))
    }

    const getUserByEmail = async (email: string) => {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        return user ? User.fromJson(user) : null
    }

    const createUser = async (user: User, credentials: LoginCredentials) => {
        const password = await User.hashPassword(credentials.password)

        const dbUser = await prisma.user.create({
            data: {
                ...user.toJson(),
                password,
            },
        })

        return dbUser ? User.fromJson(dbUser) : null
    }

    return {
        getUsers,
        getUserByEmail,
        createUser,
    }
}