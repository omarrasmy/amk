import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiDocs } from 'src/helper/decorator/swagger';
import { LocationResponseDto } from './dto/find-location.dto';
import { ParamCheck } from 'src/helper/decorator/check-parameters';
import { EntitiesEnum } from 'src/helper/enums/entities.enum';
import { UpdateLocationDto } from './dto/update-location.dto';
@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) { }

  @Post()
  @ApiDocs({
    summary: 'Create a new location',
    body: CreateLocationDto,
    response: LocationResponseDto,
    statusCode: HttpStatus.CREATED,
    isPublic: true,
  })
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  @ApiDocs({
    summary: 'Get all locations',
    response: LocationResponseDto,
    statusCode: HttpStatus.OK,
    isPublic: true,
  })
  findAll() {
    return this.locationService.findAll();
  }

  @Get(':id')
  @ApiDocs({
    summary: 'Get a location by ID',
    response: LocationResponseDto,
    statusCode: HttpStatus.OK,
    isPublic: true,
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the location to retrieve',
    type: Number,
    required: true
  })
  findOne(
    @ParamCheck({ tableName: [EntitiesEnum.Location], paramsToCheck: ['id'] }) params: { id: number; },

  ) {
    return this.locationService.findOne(params.id);
  }

  @Patch(':id')
  @ApiDocs({
    summary: 'Update a location by ID',
    body: CreateLocationDto,
    response: LocationResponseDto,
    statusCode: HttpStatus.OK,
    isPublic: true,
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the location to update',
    type: Number,
    required: true
  })
  update(
    @ParamCheck({ tableName: [EntitiesEnum.Location], paramsToCheck: ['id'] }) params: { id: number; }
    , @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationService.update(params.id, updateLocationDto);
  }

  @Delete(':id')
  @ApiDocs({
    summary: 'Delete a location by ID',
    response: LocationResponseDto,
    statusCode: HttpStatus.OK,
    isPublic: true,
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the location to delete',
    type: Number,
    required: true
  })
  remove
    (
      @ParamCheck({ tableName: [EntitiesEnum.Location], paramsToCheck: ['id'] }) params: { id: number; }
    ) {
    return this.locationService.remove(params.id);
  }
}
