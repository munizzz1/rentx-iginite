import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IFindCarsDTO } from "../dtos/IFindCarsDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRespository {
    create(data: ICreateCarDTO): Promise<Car>;
    finByLicensePlate(license_plate: string): Promise<Car>;
    findAvailable(data: IFindCarsDTO): Promise<Car[]>;
    findById(id: string): Promise<Car>;
    updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRespository };