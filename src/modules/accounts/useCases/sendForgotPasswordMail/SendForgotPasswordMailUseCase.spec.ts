import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let usersRepositoryImMemory: UsersRepositoryInMemory;
let usersTokensRepositoryImMemory: UsersTokensRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let mailProviderInMemory: MailProviderInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe('Send Forgot Password Mail', () => {

    beforeEach(() => {
        usersRepositoryImMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryImMemory = new UsersTokensRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        mailProviderInMemory = new MailProviderInMemory()
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryImMemory, usersTokensRepositoryImMemory, dayjsDateProvider, mailProviderInMemory
        );
    });

    it('should be able to send a forgot password mail to user', async () => {
        const sendMail = spyOn(mailProviderInMemory, 'sendMail');

        await usersRepositoryImMemory.create({
            driver_license: '664168',
            email: 'teste@teste.com.br',
            name: 'teste email',
            password: '12345',
        });

        await sendForgotPasswordMailUseCase.execute('teste@teste.com.br');

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to send an email if user does not exists', async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute('ttt@teste.com.br')
        ).rejects.toEqual(new AppError('User does not exists'));
    });

    it('should be able to create an users token', async () => {
        const generateTokenMail = spyOn(usersTokensRepositoryImMemory, 'create');

        await usersRepositoryImMemory.create({
            driver_license: '6666',
            email: 'teste2@teste2.com.br',
            name: 'teste2 email',
            password: '12345',
        });

        await sendForgotPasswordMailUseCase.execute('teste2@teste2.com.br');

        expect(generateTokenMail).toBeCalled();
    });
});