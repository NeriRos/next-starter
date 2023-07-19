export class PasswordsDontMatch extends Error {
    constructor() {
        super("Passwords don't match")
    }
}