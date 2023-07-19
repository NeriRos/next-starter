import { createAuthenticationService } from "@/auth/lib/services/AuthenticationService"
import { createUsersDbRepository } from "@/auth/lib/repositories/UsersDbRepository"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"

const authenticationService = createAuthenticationService({
    dbRepository: createUsersDbRepository(),
})

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                return authenticationService.authenticate({
                    email: credentials.email,
                    password: credentials.password,
                })
            },
        }),
    ],
}
