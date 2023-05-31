import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { Repository } from 'typeorm';
import { FindAccountsArgs } from './dto/find-accounts.args';
import { FindAccountArgs } from './dto/find-account.args';
import { CreateAccountInput } from './dto/create-account.input';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private categoryRepo: Repository<Account>,
  ) {}

  find(args: FindAccountsArgs) {
    return this.categoryRepo.find({ where: { createdById: args.createdById } });
  }

  async findOne(args: FindAccountArgs) {
    const a = await this.categoryRepo.findOne({ where: { ...args } });
    return this.categoryRepo.findOne({ where: { ...args } });
  }

  create(input: CreateAccountInput) {
    return this.categoryRepo.save({
      name: input.name,
      createdById: input.createdById,
    });
  }

  async delete(id: number) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) return;

    await this.categoryRepo.remove(category);

    return { ...category, id };
  }
}
