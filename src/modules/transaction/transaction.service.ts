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
    const { createdById, fromDate, toDate } = args;
    const start = dayjs(fromDate).format('YYYY-MM-DD');
    const end = dayjs(toDate).format('YYYY-MM-DD');
    return this.transRepo.find({
      where: {
        createdById,
        date: Between(new Date(start), new Date(end)),
      },
      order: { date: 'DESC' },
    });
  }
}
