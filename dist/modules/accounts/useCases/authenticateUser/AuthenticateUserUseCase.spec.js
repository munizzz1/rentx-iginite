"use strict";

var _AppError = require("@shared/errors/AppError");

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _CreateUserUseCase = require("../createUser/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

let authenticateUserUseCase;
let usersRepositoryInMemory;
let usersTokensRepositoryInMemory;
let createUserUseCase;
let dayjsDateProvider;
describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dayjsDateProvider);
  });
  it('should be able to authenticate an user', async () => {
    const user = {
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
    await expect(authenticateUserUseCase.execute({
      email: 'false@email.com',
      password: '1234'
    })).rejects.toEqual(new _AppError.AppError('Email or password incorrect!'));
  });
  it('should not be able to authenticate with incorrect password', async () => {
    const user = {
      driver_license: '00123',
      email: 'teste@teste.com.br',
      name: 'teste',
      password: '12345'
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: '1234'
    })).rejects.toEqual(new _AppError.AppError('Email or password incorrect!'));
  });
});