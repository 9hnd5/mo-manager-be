import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { Transaction } from 'src/entities/transaction.entity';
import { Between, Repository } from 'typeorm';
import { FindTransactionsArgs } from './dto/find-transactions.args';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction) private transRepo: Repository<Transaction>,
  ) {}

  find(args: FindTransactionsArgs) {
    const { createdById, date } = args;
    const start = dayjs(date).startOf('month');
    const end = dayjs(date).endOf('month');
    return this.transRepo.find({
      where: {
        createdById,
        date: Between(
          new Date(start.format('YYYY-MM-DD')),
          new Date(end.format('YYYY-MM-DD')),
        ),
      },
      order: { date: 'DESC' },
    });
  }
}
