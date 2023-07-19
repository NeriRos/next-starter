"use server"
import { getServerSession } from "next-auth"
import { TEXTS } from "@/auth/components/consts"

export default async function AuthStatus() {
    const session = await getServerSession()

    return (
        <div className="absolute top-5 w-full flex justify-center items-center">
            {session && (
                <p className="text-stone-200 text-sm">
                    {TEXTS.signedInAs} {session.user?.email}
                </p>
            )}
        </div>
    )
}
