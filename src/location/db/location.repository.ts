import { EntityRepository } from "src/database/entity.repository";
import { FindOneOptions, In, Repository } from "typeorm";
import { LocationResponseDto } from "../dto/find-location.dto";
import { LocationInterfaceRepository } from "../interface/location.interface.repository";
import { Locations } from "./location.entity";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LOCATION_INTERFACE_SCHEMA_FACTORY } from "../interface/locations.tokens";
import { LocationInterfaceSchemaFactory } from "../interface/location.interface.schema.factory";


@Injectable()
export class LocationsRepository extends EntityRepository<Locations, LocationResponseDto> implements LocationInterfaceRepository {
    constructor(
        @InjectRepository(Locations)
        protected readonly repository: Repository<Locations>,
        @Inject(LOCATION_INTERFACE_SCHEMA_FACTORY)
        protected readonly entitySchemaFactory: LocationInterfaceSchemaFactory,
    ) {
        super(repository, entitySchemaFactory);
    }
    async update(id: number, entity: object): Promise<LocationResponseDto> {
        let updatedEntity = this.entitySchemaFactory.create(entity);
        //delete relation of tags before updating
        if (updatedEntity.tags) {
            // If tags are provided, remove existing relations

            let existingTags = await this.repository.findOne({ where: { id }, relations: ['tags'] });
            await this.repository.createQueryBuilder('locations')
                .relation(Locations, 'tags')
                .of(id)
                .remove(existingTags.tags.map(tag => tag.id));
            await this.repository.createQueryBuilder('locations')
                .relation(Locations, 'tags')
                .of(id)
                .add(updatedEntity.tags.map(tag => tag.id));
            delete updatedEntity.tags; // Remove tags from the entity to avoid TypeORM trying to update them
        }
        const updateResult = await this.repository.update(id, updatedEntity as any);
        if (updateResult.affected === 0) {
            throw new NotFoundException('Location not found for update');
        }
        return this.findOne({ where: { id } });
    }
}