import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IFindCarsDTO } from "@modules/cars/dtos/IFindCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRespository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRespository {
    cars: Car[] = [];

    async create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id, specifications, id }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name, 
            description, 
            daily_rate,
            license_plate, 
            fine_amount, 
            brand, 
            category_id,
            specifications,
            id
        });

        this.cars.push(car);

        return car;
    }

    async finByLicensePlate(license_plate: string): Promise<Car> {
       const car = this.cars.find((car) => car.license_plate === license_plate);
       return car;
    }

    async findAvailable({ category_id, brand, name }: IFindCarsDTO): Promise<Car[]> {
        const cars = this.cars
            .filter((car) => {
                if(car.available === true || 
                    (category_id && car.category_id === category_id) ||
                    (brand && car.brand === brand) ||
                    (name && car.name === name)
                ) {
                    return car
                }
                return null;
            });
        return cars;
    }

    async findById(id: string): Promise<Car> {
        const car = this.cars.find((car) => car.id === id);
        return car;
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        const findIndex = this.cars.findIndex((car) => car.id === id);
        this.cars[findIndex].available = available;
    }
}

export { CarsRepositoryInMemory };