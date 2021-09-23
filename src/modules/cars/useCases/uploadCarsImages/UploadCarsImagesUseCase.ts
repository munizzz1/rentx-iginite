import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
interface IRequest {
    car_id: string;
    images_name: string[];
}
@injectable()
class UploadCarsImagesUseCase {
    constructor(
        @inject('CarsImagesRepository')
        private carsImagesRepository: ICarsImagesRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) {}

    async execute({ car_id, images_name }: IRequest): Promise<CarImage> {
        images_name.map(async (image) => {
            await this.carsImagesRepository.create(car_id, image);
            await this.storageProvider.save(image, 'cars');
        });

        
        return 
    }
}

export { UploadCarsImagesUseCase };