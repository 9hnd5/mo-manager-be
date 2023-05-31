import { Module } from '@nestjs/common';
import { CategoryModule } from '../category/category.module';
import { TransactionItemResolver } from './transaction-item.resolver';
import { TransactionItemService } from './transaction-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionItem } from 'src/entities/transaction-item.entity';
import { Transaction } from 'src/entities/transaction.entity';
import { Category } from 'src/entities/category.entity';
import { Account } from 'src/entities/account.entity';

@Module({
  imports: [
    CategoryModule,
    TypeOrmModule.forFeature([TransactionItem, Transaction, Category, Account]),
  ],
  providers: [TransactionItemResolver, TransactionItemService],
  exports: [TransactionItemService],
})
export class TransactionItemModule {}
