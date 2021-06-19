import { inject, injectable } from "tsyringe";

import { ICarsRespository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

interface IRequest {
    id: string;
    user_id: string;
};

@injectable()
class DevolutionRentalUseCase {

    constructor(
        @inject('RentalRepository')
        private rentalRepository: IRentalsRepository,
        @inject('CarsRepository')
        private carsRepository: ICarsRespository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider,
    ) {}

    async excute({ id, user_id }: IRequest): Promise<Rental> {
        const minimun_daily = 1;

        const rental = await this.rentalRepository.findById(id);
        
        if(!rental) {
            throw new AppError('Rental does not exists');
        }

        const car = await this.carsRepository.findById(rental.car_id);

        //verificar tempo aluguel
        const dateNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.compareInDays(
            rental.start_date,
            dateNow
        );

        if(daily <= 0) {
            daily = minimun_daily;
        }

        const delay = this.dateProvider.compareInDays(
            dateNow,
            rental.expected_return_date
        );
        
        //calculo do aluguel
        let total = 0;

        if(delay > 0 ) {
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }

        total += daily * car.daily_rate;

        //Update rental
        rental.end_date = dateNow;
        rental.total = total;

        await this.rentalRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);

        return rental;
    }
}

export { DevolutionRentalUseCase };