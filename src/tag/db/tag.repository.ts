import { Inject, Injectable } from "@nestjs/common";
import { Tags } from "./tag.entity";
import { FindOneOptions, In, Repository } from "typeorm";
import { EntityRepository } from "src/database/entity.repository";
import { TagResponseDto } from "../dto/find-tag.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TAG_INTERFACE_SCHEMA_FACTORY } from "../interface/tags.tokens";
import { TagInterfaceSchemaFactory } from "../interface/tag.interface.schema.factory";
import { TagInterfaceRepository } from "../interface/tag.interface.repository";


@Injectable()
export class TagsRepository extends EntityRepository<Tags, TagResponseDto> implements TagInterfaceRepository {

    constructor(
        @InjectRepository(Tags)
        protected readonly repository: Repository<Tags>,
        @Inject(TAG_INTERFACE_SCHEMA_FACTORY)
        protected readonly entitySchemaFactory: TagInterfaceSchemaFactory,
    ) {
        super(repository, entitySchemaFactory);
    }
}