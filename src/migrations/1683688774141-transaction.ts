import { MigrationInterface, QueryRunner } from "typeorm";

export class Transaction1683688774141 implements MigrationInterface {
    name = 'Transaction1683688774141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`transaction\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` date NOT NULL, \`income\` int NOT NULL, \`expense\` int NOT NULL, \`createdById\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transaction-item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` int NOT NULL, \`account\` enum ('bank', 'credit') NOT NULL, \`category\` varchar(255) NOT NULL, \`type\` enum ('income', 'expense') NOT NULL, \`transactionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`transaction-item\` ADD CONSTRAINT \`FK_26393450d26fdfe2fddc3c44f75\` FOREIGN KEY (\`transactionId\`) REFERENCES \`transaction\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction-item\` DROP FOREIGN KEY \`FK_26393450d26fdfe2fddc3c44f75\``);
        await queryRunner.query(`DROP TABLE \`transaction-item\``);
        await queryRunner.query(`DROP TABLE \`transaction\``);
    }

}
