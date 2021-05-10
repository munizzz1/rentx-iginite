import { inject, injectable } from "tsyringe";

import { IFindCarsDTO } from "@modules/cars/dtos/IFindCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRespository } from "@modules/cars/repositories/ICarsRepository";

@injectable()
class ListAvailableCarsUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRespository
    ) {}

    async execute({ category_id, brand, name }: IFindCarsDTO): Promise<Car[]> {
        const cars = await this.carsRepository.findAvailable({category_id, brand, name});
        return cars; 
    }
}

export { ListAvailableCarsUseCase };