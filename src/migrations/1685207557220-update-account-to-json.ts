import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAccountToJson1685207557220 implements MigrationInterface {
    name = 'UpdateAccountToJson1685207557220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdById\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`transaction-item\` DROP COLUMN \`account\``);
        await queryRunner.query(`ALTER TABLE \`transaction-item\` ADD \`account\` json NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction-item\` DROP COLUMN \`account\``);
        await queryRunner.query(`ALTER TABLE \`transaction-item\` ADD \`account\` enum ('bank', 'credit') NOT NULL`);
        await queryRunner.query(`DROP TABLE \`account\``);
    }

}
