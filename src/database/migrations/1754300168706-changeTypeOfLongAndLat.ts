import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTypeOfLongAndLat1754300168706 implements MigrationInterface {
    name = 'ChangeTypeOfLongAndLat1754300168706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "locations" ADD "latitude" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "locations" ADD "longitude" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "locations" ADD "longitude" numeric(11,8) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "locations" ADD "latitude" numeric(10,8) NOT NULL`);
    }

}
