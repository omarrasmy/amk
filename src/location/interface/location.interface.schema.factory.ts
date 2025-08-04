import { IEntitySchemaFactory } from "src/database/interface.entity-schema.factory";
import { Locations } from "../db/location.entity";
import { LocationResponseDto } from "../dto/find-location.dto";

export interface LocationInterfaceSchemaFactory extends IEntitySchemaFactory<Locations, LocationResponseDto> {
} 