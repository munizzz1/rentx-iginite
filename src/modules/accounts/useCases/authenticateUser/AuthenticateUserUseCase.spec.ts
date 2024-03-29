import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dayjsDateProvider: DayjsDateProvider;

describe('Authenticate User', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        dayjsDateProvider = new DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dayjsDateProvider);
    });

    it('should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            driver_license: '00123',
            email: 'teste@teste.com.br',
            name: 'teste',
            password: '12345'
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty('token');
    });

    it('should not be able to authenticate an nonexistent user', async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: 'false@email.com',
                password: '1234'
            })
        ).rejects.toEqual(new AppError('Email or password incorrect!'));
    });

    it('should not be able to authenticate with incorrect password', async () => {
        const user: ICreateUserDTO = {
            driver_license: '00123',
            email: 'teste@teste.com.br',
            name: 'teste',
            password: '12345'
        };

        await createUserUseCase.execute(user);

        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: '1234'
            })
        ).rejects.toEqual(new AppError('Email or password incorrect!'));
    });
});