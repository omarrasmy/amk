import { IEntitySchemaFactory } from "src/database/interface.entity-schema.factory";
import { Tags } from "../db/tag.entity";
import { TagResponseDto } from "../dto/find-tag.dto";

export interface TagInterfaceSchemaFactory extends IEntitySchemaFactory<Tags, TagResponseDto> {
} 