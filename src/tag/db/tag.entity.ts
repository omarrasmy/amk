import { AutoMap } from "@automapper/classes";
import { IdentifiableEntitySchema } from "src/database/identifiable-entity.schema";
import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Locations } from "src/location/db/location.entity";

@Entity()
export class Tags extends IdentifiableEntitySchema {
    @AutoMap()
    @Column()
    lable: string;
    @AutoMap()
    @ManyToMany(() => Locations, location => location.tags, {
        onDelete: 'CASCADE',
    })
    locations: Locations[];
}

