import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiDocs } from 'src/helper/decorator/swagger';
import { TagFindAllForSwagger, TagResponseDto } from './dto/find-tag.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ParamCheck } from 'src/helper/decorator/check-parameters';
import { EntitiesEnum } from 'src/helper/enums/entities.enum';

@ApiTags('Tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) { }

  @Post()
  @ApiDocs({
    summary: 'Create a new tag',
    body: CreateTagDto,
    response: TagResponseDto,
    statusCode: HttpStatus.CREATED,
    isPublic: true,
  })
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get()
  @ApiDocs({
    summary: 'Get all tags',
    response: TagFindAllForSwagger,
    statusCode: HttpStatus.OK
  })
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  @ApiDocs({
    summary: 'Get a tag by ID',
    response: TagResponseDto,
    statusCode: HttpStatus.OK,
    isPublic: true,
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the tag to retrieve',
    type: Number,
    required: true
  })
  findOne(
    @ParamCheck({ tableName: [EntitiesEnum.Tag], paramsToCheck: ['id'] }) params: { id: number; },
  ) {
    return this.tagService.findOne(params.id);
  }

  @Patch(':id')
  @ApiDocs({
    summary: 'Update a tag by ID',
    body: UpdateTagDto,
    response: TagResponseDto,
    statusCode: HttpStatus.OK,
    isPublic: true,
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the tag to update',
    type: Number,
    required: true
  })
  update(
    @ParamCheck({ tableName: [EntitiesEnum.Tag], paramsToCheck: ['id'] }) params: { id: number; }
    , @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(params.id, updateTagDto);
  }

  @Delete(':id')
  @ApiDocs({
    summary: 'Delete a tag by ID',
    statusCode: HttpStatus.NO_CONTENT,
    isPublic: true
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the tag to delete',
    type: Number,
    required: true
  })
  remove(
    @ParamCheck({ tableName: [EntitiesEnum.Tag], paramsToCheck: ['id'] }) params: { id: number; }
  ) {
    return this.tagService.remove(params.id);
  }
}
