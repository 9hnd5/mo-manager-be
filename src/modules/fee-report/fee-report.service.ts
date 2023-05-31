import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { TransactionItem } from 'src/entities/transaction-item.entity';
import { Transaction } from 'src/entities/transaction.entity';
import { Between, DataSource, Repository } from 'typeorm';
import { FindFeeReportArgs } from './dto/find-fee-report.args';
import { FindFeeReportRes } from './dto/find-fee-report.res';

@Injectable()
export class FeeReportService {
  constructor(
    @InjectRepository(Transaction) private transRepo: Repository<Transaction>,
    private datasource: DataSource,
  ) {}

  async find(args: FindFeeReportArgs): Promise<FindFeeReportRes> {
    const { date = new Date() } = args;

    const start = dayjs(date).startOf('month');
    const end = dayjs(date).endOf('month');

    const trans = await this.transRepo.find({
      where: {
        date: Between(
          new Date(start.format('YYYY-MM-DD')),
          new Date(end.format('YYYY-MM-DD')),
        ),
      },
    });

    if (!trans) return;

    const totalIncome = trans.reduce((pre, curr) => {
      return pre + curr.income;
    }, 0);

    const totalExpense = trans.reduce((pre, curr) => {
      return pre + curr.expense;
    }, 0);

    const result = ['income', 'expense'].map(async (type) => {
      const subQuery = this.datasource
        .createQueryBuilder()
        .subQuery()
        .select('SUM(ti.amount)')
        .from(TransactionItem, 'ti')
        .innerJoin('ti.transaction', 't')
        .where('ti.type = :type', { type })
        .andWhere('DATE(t.date) between :start and :end', {
          start: start.format('YYYY-MM-DD'),
          end: end.format('YYYY-MM-DD'),
        })
        .getQuery();

      return this.datasource
        .createQueryBuilder()
        .select('ti.category', 'category')
        .addSelect('SUM(ti.amount)', 'amount')
        .addSelect(`(SUM(ti.amount) / (${subQuery})) * 100`, 'percent')
        .from(TransactionItem, 'ti')
        .innerJoin('ti.transaction', 't')
        .where('ti.type = :type', { type })
        .andWhere('DATE(t.date) between :start and :end', {
          start: start.format('YYYY-MM-DD'),
          end: end.format('YYYY-MM-DD'),
        })
        .groupBy('ti.category')
        .getRawMany<FindFeeReportRes['income'][0]>();
    });

    return {
      totalIncome,
      totalExpense,
      income: await result[0],
      expense: await result[1],
    };
  }
}
