import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from "@automapper/classes";

export class GenericFindAllDomainResponse<TEntity> {
  @AutoMap()
  @ApiProperty({
    description: 'Array of entities',
  })
  data: TEntity[];
  @AutoMap()
  @ApiProperty({
    description: 'Current page number',
    example: 1
  })
  currentPage: number;
  @AutoMap()
  @ApiProperty({
    description: 'Next page number',
    example: 2
  })
  nextPage: number;
  @ApiProperty({
    description: 'Total number of entities',
    example: 100
  })
  @AutoMap()
  totalCount: number;
  @ApiProperty({
    description: 'Count of entities in the current page',
    example: 10
  })
  @AutoMap()
  count: number;

  constructor(entity?: TEntity[], currentPage?, nextPage?, totalCount?, count?) {
    this.data = entity as TEntity[];
    this.currentPage = currentPage;
    this.nextPage = nextPage;
    this.totalCount = totalCount;
    this.count = count;
  }
}
