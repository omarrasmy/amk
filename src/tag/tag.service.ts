import { Inject, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TAG_INTERFACE_REPOSITORY } from './interface/tags.tokens';
import { TagInterfaceRepository } from './interface/tag.interface.repository';
import { RedisService } from 'src/redis/redis.service';
import { RedisKey } from 'src/redis/enums/redis-key.enums';

@Injectable()
export class TagService {
  constructor(
    @Inject(TAG_INTERFACE_REPOSITORY)
    private readonly tagRepository: TagInterfaceRepository, // Replace 'any' with the actual type of your repository
    private readonly redisService: RedisService
  ) { }
  create(createTagDto: CreateTagDto) {
    return this.tagRepository.create(createTagDto);
  }

  findAll() {
    return this.tagRepository.findAll({});
  }

  async findOne(id: number) {
    let cachedTag = await this.redisService.get(RedisKey.TAG + id);
    if (cachedTag) {
      return cachedTag;
    }
    let tag = await this.tagRepository.findOne({ where: { id } });
    await this.redisService.set(RedisKey.TAG + id, tag);
    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    let tag = await this.tagRepository.update(id, updateTagDto);
    //delete the cache after update
    await this.redisService.del(RedisKey.TAG + id);
    return tag;
  }

  async remove(id: number) {
    await this.tagRepository.softDelete({ where: { id } });
    //delete the cache after delete
    await this.redisService.del(RedisKey.TAG + id);
  }
}
