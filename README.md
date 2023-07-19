# Nextjs Starter

This is a starter template for [Next.js](https://nextjs.org/).

**This is a unique starter template. It trys to be as much seperated from the framework as possible, but still taking
advantage of it.**

It includes:

- [Tailwind CSS](https://tailwindcss.com/) for styling
- [TypeScript](https://www.typescriptlang.org/) for type checking
- [ESLint](https://eslint.org/) for linting
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [Prisma](https://www.prisma.io/) for database access
- [Postgresql](https://www.postgresql.org/) for the database

## Getting Started

### Install dependencies

```bash
pnpm i
```

### Env setup

Create a `.env.local` file similar to `.env.example` with the appropriate values.

You can use Vercel postgresql for development. You can get the connection string from the Vercel dashboard. \
Simply create a new database on the dashboard and run the following command to get the connection string:

```bash
vercel env pull .env.local
```

### Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
