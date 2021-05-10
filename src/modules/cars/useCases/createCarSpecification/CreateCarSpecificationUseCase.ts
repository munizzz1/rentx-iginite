import { inject, injectable } from "tsyringe";

import { ICarsRespository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRespository
    ) {}

    async execute({ car_id, specifications_id }: IRequest): Promise<void> {
        const carExists = await this.carsRepository.findById(car_id);

        if(!carExists) {
            throw new AppError('Car does not exist');
        }
    }
}

export { CreateCarSpecificationUseCase };