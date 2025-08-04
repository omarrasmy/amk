import { createMap, forMember, mapFrom, Mapper, MappingProfile } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { Locations } from "src/location/db/location.entity";
import { CreateLocationDto } from "src/location/dto/create-location.dto";
import { LocationResponseDto } from "src/location/dto/find-location.dto";
import { Tags } from "src/tag/db/tag.entity";
import { TagResponseDto } from "src/tag/dto/find-tag.dto";


@Injectable()
export class LocationsProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }


    override get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, Locations, LocationResponseDto,
                forMember((des) => des.tags,
                    mapFrom((src) => {
                        if (src.tags) {
                            return mapper.mapArray(src.tags, Tags, TagResponseDto);
                        }
                        return undefined;
                    })
                )
            );
            createMap(mapper, LocationResponseDto, Locations);
            createMap(mapper, CreateLocationDto, Locations,
                forMember((des) => des.tags, mapFrom((src) => {
                    if (src.tags && Array.isArray(src.tags)) {
                        return src.tags.map((tag) => {
                            return { id: tag }
                        })
                    }
                    return undefined;
                }))
            );
        };
    }
}
