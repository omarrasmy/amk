import { GenericFindAllDomainResponse } from "src/helper/dto/generic-domain-find-all-response.dto";

import { Mapper } from "@automapper/core";
import { DeepPartial } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";
import { TagResponseDto } from "../dto/find-tag.dto";
import { TagInterfaceSchemaFactory } from "../interface/tag.interface.schema.factory";
import { Tags } from "./tag.entity";
import { CreateTagDto } from "../dto/create-tag.dto";

@Injectable()
export class TagSchemaFactory implements TagInterfaceSchemaFactory {
    constructor(@InjectMapper() private readonly mapper: Mapper) { }
    findAllToDto(data: Tags[], dataLength: number, count: number, page: number, take: number): GenericFindAllDomainResponse<TagResponseDto> {
        let entities = this.mapper.mapArray(data, Tags, TagResponseDto);
        return new GenericFindAllDomainResponse<TagResponseDto>(
            entities,
            page,
            count > (page * take) ? page + 1 : null,
            count,
            dataLength
        );
    }
    createFromSchema(entitySchema: Tags): TagResponseDto {
        return this.mapper.map(entitySchema, Tags, TagResponseDto);
    }

    create(data: CreateTagDto): DeepPartial<Tags> {
        return this.mapper.map(data, CreateTagDto, Tags);
    }
}