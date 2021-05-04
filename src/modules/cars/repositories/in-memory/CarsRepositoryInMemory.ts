import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRespository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRespository {
    cars: Car[] = [];

    async create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name, 
            description, 
            daily_rate,
            license_plate, 
            fine_amount, 
            brand, 
            category_id
        });

        this.cars.push(car);

        return car;
    }

    async finByLicensePlate(license_plate: string): Promise<Car> {
       const car = this.cars.find((car) => car.license_plate === license_plate);
       return car;
    }
}

export { CarsRepositoryInMemory };