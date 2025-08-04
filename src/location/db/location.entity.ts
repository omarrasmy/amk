import { AutoMap } from "@automapper/classes";
import { IdentifiableEntitySchema } from "src/database/identifiable-entity.schema";
import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Tags } from "src/tag/db/tag.entity";

@Entity()
export class Locations extends IdentifiableEntitySchema {
    @AutoMap()
    @Column()
    name: string;
    @AutoMap()
    @Column({
        // type: 'numeric',
        // precision: 10,
        // scale: 8,
        // nullable: false
    })
    latitude: string;
    @AutoMap()
    @Column({
        // type: 'numeric',
        // precision: 11,
        // scale: 8,
        // nullable: false
    })
    longitude: string;
    @AutoMap()
    @ManyToMany(() => Tags, tag => tag.locations, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinTable({
        name: 'location_tags',
    })
    tags: Tags[];
    @AutoMap()
    mapUrl: string;
    @AfterLoad()
    addMapUrl() {
        this.mapUrl = `https://maps.google.com/maps?q=${this.latitude},${this.longitude}`;
    }
}

