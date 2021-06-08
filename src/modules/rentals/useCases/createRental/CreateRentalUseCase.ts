import { inject, injectable } from 'tsyringe';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { ICarsRespository } from '@modules/cars/repositories/ICarsRepository';

dayjs.extend(utc);

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider,
        @inject('CarsRepository')
        private carsRepository: ICarsRespository
    ) {}

    async execute({ user_id, car_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
        const minHour = 24;

        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if(carUnavailable) {
            throw new AppError('Car is unavailable');
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if(rentalOpenToUser) {
            throw new AppError("There's a rental is progress for user");
        }

        const dateNow = this.dateProvider.dateNow();

        const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

        if(compare < minHour) {
            throw new AppError('Invalid return time');
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        });

        await this.carsRepository.updateAvailable(car_id, false);
        
        return rental;
    }
}

export { CreateRentalUseCase };