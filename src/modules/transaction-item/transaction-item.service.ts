import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionItem } from 'src/entities/transaction-item.entity';
import { Repository } from 'typeorm';
import { FindTransItemArgs } from './dto/find-trans-items.args';
import { Transaction } from 'src/entities/transaction.entity';
import { UpdateTransactionItemInput } from './dto/update-transaction-item.input';
import { Category } from 'src/entities/category.entity';
import dayjs from 'dayjs';
import { CreateTransactionItemInput } from './dto/create-transaction-item.input';
import { Account } from 'src/entities/account.entity';

@Injectable()
export class TransactionItemService {
  constructor(
    @InjectRepository(TransactionItem)
    private transItemRepo: Repository<TransactionItem>,
    @InjectRepository(Transaction) private transRepo: Repository<Transaction>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Account) private accountRepo: Repository<Account>,
  ) {}

  find(args: FindTransItemArgs) {
    return this.transItemRepo.find({ where: { ...args } });
  }

  findOne(id: number) {
    return this.transItemRepo.findOne({ where: { id } });
  }

  async create(input: CreateTransactionItemInput) {
    const { date, amount, accountId, type, categoryId, note } = input;
    const existTrans = await this.transRepo.findOne({
      where: { date },
      relations: {
        transactionItems: true,
      },
    });

    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
    });

    const account = await this.accountRepo.findOne({
      where: { id: accountId },
    });
    if (!account) return;

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

  async update(input: UpdateTransactionItemInput) {
    const { id, categoryId, type, date, amount, accountId, note } = input;
    const existTransItem = await this.transItemRepo.findOne({
      where: { id },
      relations: {
        transaction: {
          transactionItems: true,
        },
      },
    });
    if (!existTransItem) return;

    const existTrans = existTransItem.transaction;

    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
    });
    if (!category) return;

    const account = await this.accountRepo.findOne({
      where: { id: accountId },
    });
    if (!account) return;

    if (dayjs(existTrans.date).isSame(date)) {
      if (type === 'income') {
        existTrans.income += amount;
        existTrans.expense -= amount;
      }

      if (type === 'expense') {
        existTrans.income -= amount;
        existTrans.expense += amount;
      }

      existTransItem.account = account;
      existTransItem.amount = amount;
      existTransItem.category = category;
      existTransItem.type = type;
      existTransItem.note = note;

      return this.transItemRepo.save(existTransItem);
    }

    const index = existTrans.transactionItems.findIndex(
      (x) => x.id === existTransItem.id,
    );
    existTrans.transactionItems.splice(index, 1);
    if (existTrans.transactionItems.length === 0) {
      await this.transRepo.remove(existTrans);
    } else {
      const [income, expense] = existTrans.transactionItems.reduce(
        (pre, curr) => {
          if (curr.type === 'income') return [pre[0] + curr.amount, pre[1]];
          else {
            return [pre[0], pre[1] + curr.amount];
          }
        },
        [0, 0],
      );
      existTrans.income = income;
      existTrans.expense = expense;

      await this.transRepo.save(existTrans);
    }

    const trans = await this.transRepo.findOne({
      where: { date },
      relations: { transactionItems: true },
    });
    if (!trans) {
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
      await this.transRepo.save(newTrans);

      return newTransItem;
    }

    if (trans) {
      if (type === 'income') trans.income += amount;

      if (type === 'expense') trans.expense += amount;

      const newTransItem = new TransactionItem();
      newTransItem.account = account;
      newTransItem.amount = amount;
      newTransItem.category = category;
      newTransItem.type = type;
      newTransItem.note = note;

      trans.transactionItems.push(newTransItem);
      await this.transRepo.save(trans);

      return newTransItem;
    }
  }

  async delete(id: number) {
    const existTransItem = await this.transItemRepo.findOne({ where: { id } });
    if (!existTransItem) return;

    const trans = await this.transRepo.findOne({
      where: {
        id: existTransItem.transactionId,
      },
      relations: { transactionItems: true },
    });
    if (!trans) return;

    if (existTransItem.type === 'income') {
      trans.income -= existTransItem.amount;
    } else {
      trans.expense += existTransItem.amount;
    }

    const index = trans.transactionItems.findIndex(
      (x) => x.id === existTransItem.id,
    );
    trans.transactionItems.splice(index, 1);

    if (trans.transactionItems.length === 0) {
      await this.transRepo.remove(trans);
    } else {
      await this.transRepo.save(trans);
    }

    return { ...existTransItem, id };
  }
}
