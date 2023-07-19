import "@/styles/globals.css"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"
import React, { Suspense } from "react"
import AuthStatus from "@/app/(authentication)/components/AuthStatus"
import { METADATA } from "@/app/consts"

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
})


export const metadata: Metadata = {
    title: METADATA.title,
    description: METADATA.description,
    twitter: {
        card: "summary_large_image",
        title: METADATA.title,
        description: METADATA.description,
    },
    metadataBase: new URL(METADATA.base),
    themeColor: METADATA.themeColor,
}

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={inter.variable}
              suppressHydrationWarning={true}>
        <Toaster />
        <Suspense fallback="Loading...">
            <AuthStatus />
        </Suspense>
        {children}
        </body>
        </html>
    )
}
