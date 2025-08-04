import { GenericFindAllDomainResponse } from "src/helper/dto/generic-domain-find-all-response.dto";
import { Mapper } from "@automapper/core";
import { DeepPartial } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";
import { LocationInterfaceSchemaFactory } from "../interface/location.interface.schema.factory";
import { LocationResponseDto } from "../dto/find-location.dto";
import { CreateLocationDto } from "../dto/create-location.dto";
import { Locations } from "./location.entity";

@Injectable()
export class LocationSchemaFactory implements LocationInterfaceSchemaFactory {
    constructor(@InjectMapper() private readonly mapper: Mapper) { }
    findAllToDto(data: Locations[], dataLength: number, count: number, page: number, take: number): GenericFindAllDomainResponse<LocationResponseDto> {
        let entities = this.mapper.mapArray(data, Locations, LocationResponseDto);
        return new GenericFindAllDomainResponse<LocationResponseDto>(
            entities,
            page,
            count > (page * take) ? page + 1 : null,
            count,
            dataLength
        );
    }
    createFromSchema(entitySchema: Locations): LocationResponseDto {
        return this.mapper.map(entitySchema, Locations, LocationResponseDto);
    }

    create(data: CreateLocationDto): DeepPartial<Locations> {
        return this.mapper.map(data, CreateLocationDto, Locations);
    }
}