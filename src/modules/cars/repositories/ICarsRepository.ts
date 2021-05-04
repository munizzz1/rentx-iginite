import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRespository {
    create(data: ICreateCarDTO): Promise<Car>;
    finByLicensePlate(license_plate: string): Promise<Car>;
}

export { ICarsRespository };