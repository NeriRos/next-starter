import * as process from "process"

export const METADATA = {
    title: "Next.js Prisma Postgres Auth Starter",
    description:
        "This is a Next.js starter kit that uses Next-Auth for simple email + password login and a Postgres database to persist the data.",
    base: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    themeColor: "#FFF",
}