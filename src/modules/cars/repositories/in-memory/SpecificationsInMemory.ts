import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";


class SpecificationsInMemory implements ISpecificationsRepository {
    specification: Specification[] = [];

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            name, description
        });

        this.specification.push(specification);

        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = this.specification.find((specification) => specification.name === name);
        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = this.specification.filter((specification) => ids.includes(specification.id));
        return specifications;
    }

    async list(): Promise<Specification[]> {
        return this.specification;
    }
}

export { SpecificationsInMemory };