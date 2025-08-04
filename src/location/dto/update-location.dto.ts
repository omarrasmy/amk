import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsStrongPassword } from 'class-validator';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { CreateLocationDto } from './create-location.dto';

@ApiExtraModels(CreateLocationDto)
export class UpdateLocationDto extends PartialType(CreateLocationDto) {
}
