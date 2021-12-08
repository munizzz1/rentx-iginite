"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _MailProviderInMemory = require("@shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _AppError = require("@shared/errors/AppError");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let usersRepositoryImMemory;
let usersTokensRepositoryImMemory;
let dayjsDateProvider;
let mailProviderInMemory;
let sendForgotPasswordMailUseCase;
describe('Send Forgot Password Mail', () => {
  beforeEach(() => {
    usersRepositoryImMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepositoryImMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    mailProviderInMemory = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryImMemory, usersTokensRepositoryImMemory, dayjsDateProvider, mailProviderInMemory);
  });
  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = spyOn(mailProviderInMemory, 'sendMail');
    await usersRepositoryImMemory.create({
      driver_license: '664168',
      email: 'teste@teste.com.br',
      name: 'teste email',
      password: '12345'
    });
    await sendForgotPasswordMailUseCase.execute('teste@teste.com.br');
    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to send an email if user does not exists', async () => {
    await expect(sendForgotPasswordMailUseCase.execute('ttt@teste.com.br')).rejects.toEqual(new _AppError.AppError('User does not exists'));
  });
  it('should be able to create an users token', async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryImMemory, 'create');
    await usersRepositoryImMemory.create({
      driver_license: '6666',
      email: 'teste2@teste2.com.br',
      name: 'teste2 email',
      password: '12345'
    });
    await sendForgotPasswordMailUseCase.execute('teste2@teste2.com.br');
    expect(generateTokenMail).toBeCalled();
  });
});