import { IEntityRepository } from "src/database/interface.entity.repository";
import { FindOneOptions } from "typeorm";
import { Locations } from "../db/location.entity";
import { LocationResponseDto } from "../dto/find-location.dto";

export interface LocationInterfaceRepository extends IEntityRepository<Locations, LocationResponseDto> {

}