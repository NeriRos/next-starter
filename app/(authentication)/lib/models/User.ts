import { compare, hash } from "bcrypt"
import { User as NextUser } from "next-auth"

export class User implements NextUser {

    constructor(
        public id: string,
        public name: string,
        public email: string,
        private _password?: string,
        public created_at?: Date,
        public updated_at?: Date,
    ) {
    }

    static hashPassword(password: string): Promise<string> {
        return hash(password, 10)
    }

    static fromJson(json: any): User {
        return new User(
            json.id,
            json.name,
            json.email,
            json.password,
            json.created_at,
            json.updated_at,
        )
    }

    async changePassword(password: string) {
        this._password = await User.hashPassword(password)
    }

    comparePassword(password: string): Promise<boolean> {
        if (this._password === undefined)
            return Promise.resolve(false)

        return compare(password, this._password)
    }

    toJson(): any {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            created_at: this.created_at,
            updated_at: this.updated_at,
        }
    }
}