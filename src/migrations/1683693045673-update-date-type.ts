import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDateType1683693045673 implements MigrationInterface {
    name = 'UpdateDateType1683693045673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`date\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`date\` date NOT NULL`);
    }

}
