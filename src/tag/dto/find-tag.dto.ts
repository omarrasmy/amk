import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { GenericFindAllDomainResponse } from "src/helper/dto/generic-domain-find-all-response.dto";

export class TagResponseDto {
    @AutoMap()
    @ApiProperty({
        description: 'The unique identifier of the tag',
        example: 1
    })
    id: number;
    @AutoMap()
    @ApiProperty({
        description: 'The name of the tag',
        example: 'Action'
    })
    lable: string;
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
}
export class TagFindAllForSwagger extends GenericFindAllDomainResponse<TagResponseDto> {
    @AutoMap()
    @ApiProperty({
        description: 'The list of Tags',
        type: () => [TagResponseDto],
    })
    data: TagResponseDto[];
}