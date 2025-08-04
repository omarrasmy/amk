import { AutoMap } from '@automapper/classes';
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class IdentifiableEntitySchema extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;
  @AutoMap()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @AutoMap()
  updatedAt: Date;
  @DeleteDateColumn()
  @AutoMap()
  deletedAt: Date;
}
