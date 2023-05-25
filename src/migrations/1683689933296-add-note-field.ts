import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNoteField1683689933296 implements MigrationInterface {
    name = 'AddNoteField1683689933296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction-item\` ADD \`note\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction-item\` DROP COLUMN \`note\``);
    }

}
