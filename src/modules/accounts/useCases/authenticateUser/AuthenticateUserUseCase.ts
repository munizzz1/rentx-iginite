import { inject, injectable } from "tsyringe";
import { compare } from 'bcryptjs';
import { sign } from "jsonwebtoken";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IResquest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    },
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository
    ) {}

    async execute({ email, password }: IResquest): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email);

        if(!user) {
            throw new AppError('Email or password incorrect!');
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new AppError('Email or password incorrect!');
        }

        const token = sign({}, '3517e6c9113ba423d60eb172f83791d4', {
            subject: user.id,
            expiresIn: '1d'
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };