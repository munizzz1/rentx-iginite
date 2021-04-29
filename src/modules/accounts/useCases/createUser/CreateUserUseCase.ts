import { inject, injectable } from "tsyringe";
import { hash } from 'bcryptjs';

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@errors/AppError";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository
    ) {}

    async execute({ name, email, driver_license, password }: ICreateUserDTO): Promise<void> {
        const userExist = await this.userRepository.findByEmail(email);

        if(userExist) {
            throw new AppError('User already exists')
        }

        const passwordHash = await hash(password, 8);

        await this.userRepository.create({
            name, 
            email, 
            driver_license, 
            password: passwordHash
        });
    }
}

export { CreateUserUseCase };