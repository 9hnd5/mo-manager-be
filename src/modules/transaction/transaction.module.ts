import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionItem } from 'src/entities/transaction-item.entity';
import { Transaction } from 'src/entities/transaction.entity';
import { TransactionItemModule } from '../transaction-item/transaction-item.module';
import { TransactionResolver } from './transaction.resolver';
import { TransactionService } from './transaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, TransactionItem]),
    TransactionItemModule,
  ],
  providers: [TransactionService, TransactionResolver],
})
export class TransactionModule {}
