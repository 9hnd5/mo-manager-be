import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionItem } from 'src/entities/transaction-item.entity';
import { Transaction } from 'src/entities/transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { FindTransactionsArgs } from './dto/find-transactions.args';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction) private transRepo: Repository<Transaction>,
  ) {}

  find(args: FindTransactionsArgs) {
    return this.transRepo.find();
  }

  async findTransItems(id: number) {
    const transaction = await this.transRepo.findOne({
      where: { id },
      relations: {
        transactionItems: true,
      },
    });
    return transaction.transactionItems;
  }

  async create(input: CreateTransactionInput) {
    console.log(input);
    const { date, amount, account, type, category, note } = input;
    const existTrans = await this.transRepo.findOne({
      where: { date },
      relations: {
        transactionItems: true,
      },
    });

    if (!existTrans) {
      const newTrans = this.transRepo.create({
        date: date,
        income: type === 'income' ? amount : 0,
        expense: type === 'expense' ? amount : 0,
        createdById: 1,
      });

      const newTransItem = new TransactionItem();
      newTransItem.account = account;
      newTransItem.amount = amount;
      newTransItem.category = category;
      newTransItem.type = type;
      newTransItem.note = note;

      newTrans.transactionItems = [newTransItem];
      return this.transRepo.save(newTrans);
    }

    if (type === 'income') existTrans.income += amount;

    if (type === 'expense') existTrans.expense += amount;

    const newTransItem = new TransactionItem();
    newTransItem.account = account;
    newTransItem.amount = amount;
    newTransItem.category = category;
    newTransItem.type = type;
    newTransItem.note = note;

    existTrans.transactionItems.push(newTransItem);
    return this.transRepo.save(existTrans);
  }
}
