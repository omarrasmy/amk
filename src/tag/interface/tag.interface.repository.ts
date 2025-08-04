import { IEntityRepository } from "src/database/interface.entity.repository";
import { Tags } from "../db/tag.entity";
import { TagResponseDto } from "../dto/find-tag.dto";

export interface TagInterfaceRepository extends IEntityRepository<Tags, TagResponseDto> {
}