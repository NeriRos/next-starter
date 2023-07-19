import { User } from "@/auth/lib/models/User"

export type LoginCredentials = {
    email: string;
    password: string;
}

export type RegisterArgs = Pick<User, "name"> & LoginCredentials