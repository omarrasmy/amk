import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TAG_INTERFACE_REPOSITORY, TAG_INTERFACE_SCHEMA_FACTORY } from './interface/tags.tokens';
import { TagsRepository } from './db/tag.repository';
import { TagSchemaFactory } from './db/tag.schema.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tags } from './db/tag.entity';
import { TagsProfile } from 'src/automapper/tags.profile';

@Module({
  controllers: [TagController],
  providers: [TagService,
    {
      provide: TAG_INTERFACE_REPOSITORY,
      useClass: TagsRepository, // Assuming you have a TagSchemaFactory similar to LocationInterfaceSchemaFactory
    },
    {
      provide: TAG_INTERFACE_SCHEMA_FACTORY,
      useClass: TagSchemaFactory, // Assuming you have a TagSchemaFactory similar to Location
    },
    TagsProfile
  ],
  imports: [
    TypeOrmModule.forFeature([Tags]), // Register the Tags entity with TypeORM
  ]
})
export class TagModule { }
