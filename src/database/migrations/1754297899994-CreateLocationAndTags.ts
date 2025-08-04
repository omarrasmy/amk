import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLocationAndTags1754297899994 implements MigrationInterface {
    name = 'CreateLocationAndTags1754297899994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deletedAt" TIMESTAMP, "label" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "locations" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "latitude" numeric(10,8) NOT NULL, "longitude" numeric(11,8) NOT NULL, CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "location_tags" ("locationsId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_fd81a4e11927af3c8868aff35b8" PRIMARY KEY ("locationsId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3e65ac5d667245fb37616469fb" ON "location_tags" ("locationsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e02e99b037db2f68326f44f441" ON "location_tags" ("tagsId") `);
        await queryRunner.query(`ALTER TABLE "location_tags" ADD CONSTRAINT "FK_3e65ac5d667245fb37616469fb5" FOREIGN KEY ("locationsId") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "location_tags" ADD CONSTRAINT "FK_e02e99b037db2f68326f44f4418" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location_tags" DROP CONSTRAINT "FK_e02e99b037db2f68326f44f4418"`);
        await queryRunner.query(`ALTER TABLE "location_tags" DROP CONSTRAINT "FK_3e65ac5d667245fb37616469fb5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e02e99b037db2f68326f44f441"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3e65ac5d667245fb37616469fb"`);
        await queryRunner.query(`DROP TABLE "location_tags"`);
        await queryRunner.query(`DROP TABLE "locations"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
