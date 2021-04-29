import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError('Token missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const { sub: user_id } = verify(token, '3517e6c9113ba423d60eb172f83791d4') as IPayload;

        const userRepository = new UsersRepository();
        const user = userRepository.findById(user_id);

        if(!user) {
            throw new AppError('User does not exists!', 401);
        }

        request.user = {
            id: user_id
        };

        next();

    } catch (error) {
        throw new AppError('Invalid token!', 401);
    }
}