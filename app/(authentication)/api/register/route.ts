import { NextResponse } from "next/server"
import { createAuthenticationService } from "@/auth/lib/services/AuthenticationService"
import { createUsersDbRepository } from "@/auth/lib/repositories/UsersDbRepository"
import { UserAlreadyExists } from "@/auth/lib/errors/UserAlreadyExists"
import { RegisterArgs } from "@/auth/lib/types/AuthenticationTypes"

const authenticationService = createAuthenticationService({
    dbRepository: createUsersDbRepository(),
})

export async function POST(req: Request) {
    const registerData: RegisterArgs = await req.json()
    console.log(registerData)
    try {
        const user = await authenticationService.register(registerData)

        return NextResponse.json(user)
    } catch (e) {
        if (e instanceof UserAlreadyExists) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        return NextResponse.json({ error: "Unhandled error" }, { status: 500 })
    }
}
