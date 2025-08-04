import { createMap, Mapper, MappingProfile } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { Tags } from "src/tag/db/tag.entity";
import { CreateTagDto } from "src/tag/dto/create-tag.dto";
import { TagResponseDto } from "src/tag/dto/find-tag.dto";


@Injectable()
export class TagsProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }


    override get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, Tags, TagResponseDto);
            createMap(mapper, TagResponseDto, Tags);
            createMap(mapper, CreateTagDto, Tags); // Assuming you want to map Tags to itself, adjust as necessary
        };
    }
}
