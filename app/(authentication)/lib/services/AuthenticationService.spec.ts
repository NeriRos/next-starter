import { AuthenticationService, createAuthenticationService } from "./AuthenticationService"
import { UsersDbRepository } from "@/app/(authentication)/lib/repositories/UsersDbRepository"
import { User } from "@/app/(authentication)/lib/models/User"

describe("AuthenticationService", () => {
    const userPassword = "password"
    const user = new User("0", "John Doe", "john@gmail.com", userPassword)
    const usersDbRepository: UsersDbRepository = {
        getUserByEmail: jest.fn(),
        createUser: jest.fn(),
        getUsers: jest.fn(),
    }

    it("should register", () => {
        usersDbRepository.getUserByEmail = jest.fn().mockResolvedValue(null)
        const service = createAuthenticationService({
            dbRepository: usersDbRepository,
        })

        service.register({ name: user.name, email: user.email, password: userPassword })
        expect(usersDbRepository.createUser).toHaveBeenCalled()
    })
})