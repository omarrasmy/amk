import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsLatLong, IsNotEmpty, IsOptional, IsString, IsLatitude, IsLongitude } from "class-validator";
import { IdExists } from "src/helper/decorator/check-sending-keys";
import { EntitiesEnum } from "src/helper/enums/entities.enum";

export class CreateLocationDto {
    @AutoMap()
    @IsLatitude()
    @ApiProperty({
        description: 'The latitude of the location',
        example: "37.7749"
    })
    latitude: string;
    @IsLongitude()
    @AutoMap()
    @ApiProperty({
        description: 'The longitude of the location',
        example: "-122.4194"
    })
    @IsNotEmpty()
    longitude: string;
    @AutoMap()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The name of the location',
        example: 'San Francisco'
    })
    name: string;
    @Type(() => Number)
    @IsArray()
    @Transform(({ value }) => Array.isArray(value) ? value : [value])
    @IsOptional()
    @IdExists([EntitiesEnum.Tag])
    @ApiProperty({
        description: 'Array of tag IDs associated with the location',
        type: [Number],
        required: false,
        example: [1, 2, 3]
    })
    @AutoMap()
    tags: number[];

}
