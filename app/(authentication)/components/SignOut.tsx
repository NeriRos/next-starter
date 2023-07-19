"use client"
import { signOut } from "next-auth/react"
import { TEXTS } from "@/app/(authentication)/components/consts"

export default function SignOut() {
    return (
        <button
            className="text-stone-400 hover:text-stone-200 transition-all"
            onClick={() => signOut()}
        >
            {TEXTS.signOut}
        </button>
    )
}
