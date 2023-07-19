export class NoUserFoundError extends Error {
    constructor() {
        super("No user found")
    }
}