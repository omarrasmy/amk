import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeLableName1754299707543 implements MigrationInterface {
    name = 'ChangeLableName1754299707543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" RENAME COLUMN "label" TO "lable"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" RENAME COLUMN "lable" TO "label"`);
    }

}
