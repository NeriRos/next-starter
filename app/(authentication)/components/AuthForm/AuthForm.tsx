"use client"

import { FormEvent } from "react"
import Link from "next/link"
import Button from "@/components/Button/Button"
import { useAuthForm } from "@/auth/components/AuthForm/useAuthForm"
import { LOGIN_URL, REGISTER_URL, TEXTS } from "@/auth/components/AuthForm/consts"

export const AuthForm = ({ type }: { type: "login" | "register" }) => {
    const { loading, signUp, signIn, errorHandler } = useAuthForm()

    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = e.currentTarget

        if (!data) {
            return errorHandler("Something went wrong!")
        }

        if (type === "login") {
            await signIn({
                email: data.email.value,
                password: data.password.value,
            })
        } else {
            await signUp({
                name: data.fullName.value,
                email: data.email.value,
                password: data.password.value,
            })
        }
    }

    return (
        <form
            onSubmit={submitForm}
            className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
        >
            {type === "register" ? (
                <div>
                    <label
                        htmlFor="fullName"
                        className="block text-xs text-gray-600 uppercase"
                    >
                        {TEXTS.fields.name}
                    </label>
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Panic"
                        autoComplete="name"
                        required
                        className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                    />
                </div>
            ) : null}
            <div>
                <label
                    htmlFor="email"
                    className="block text-xs text-gray-600 uppercase"
                >
                    {TEXTS.fields.email}
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="panic@dance.co"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                />
            </div>
            <div>
                <label
                    htmlFor="password"
                    className="block text-xs text-gray-600 uppercase"
                >
                    {TEXTS.fields.password}
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                />
            </div>
            <Button loading={loading}>
                <p>{type === "login" ? TEXTS.signIn : TEXTS.signUp}</p>
            </Button>
            {type === "login" ? (
                <p className="text-center text-sm text-gray-600">
                    {TEXTS.noAccount}
                    <Link href={REGISTER_URL} className="font-semibold text-gray-800">
                        {TEXTS.signUp}
                    </Link>{" "}
                    {TEXTS.forFree}
                </p>
            ) : (
                <p className="text-center text-sm text-gray-600">
                    {TEXTS.alreadyHaveAccount}
                    <Link href={LOGIN_URL} className="font-semibold text-gray-800">
                        {TEXTS.signIn}
                    </Link>{" "}
                    {TEXTS.instead}
                </p>
            )}
        </form>
    )
}
