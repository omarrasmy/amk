import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { GenericFindAllDomainResponse } from "src/helper/dto/generic-domain-find-all-response.dto";
import { TagResponseDto } from "src/tag/dto/find-tag.dto";

export class LocationResponseDto {
    @AutoMap()
    @ApiProperty({
        description: 'The unique identifier of the location',
        example: 1
    })
    id: number;
    @AutoMap()
    @ApiProperty({
        description: 'The latitude of the location',
        example: '37.7749'
    })
    latitude: number;

    @AutoMap()
    @ApiProperty({
        description: 'The longitude of the location',
        example: '-122.4194'
    })
    longitude: number;

    @AutoMap()
    @ApiProperty({
        description: 'The name of the location',
        example: 'San Francisco'
    })
    name: string;
    @AutoMap()
    @ApiProperty({
        description: 'The creation date of the tag',
        example: '2023-10-01T12:00:00Z'
    })
    createdAt: Date;
    @AutoMap()
    @ApiProperty({
        description: 'The last update date of the tag',
        example: '2023-10-01T12:00:00Z'
    })
    updatedAt: Date;
    @AutoMap()
    @ApiProperty({
        description: 'The unique identifier of the location',
        type: () => [TagResponseDto]
    })
    tags: TagResponseDto[];
    @AutoMap()
    mapUrl: string;
}

export class UserFindAllForSwagger extends GenericFindAllDomainResponse<LocationResponseDto> {
    @AutoMap()
    @ApiProperty({
        description: 'The list of users',
        type: () => [LocationResponseDto],
    })
    data: LocationResponseDto[];
}