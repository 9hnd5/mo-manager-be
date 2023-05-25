import { Module } from '@nestjs/common';
import { TransactionResolver } from './transaction.resolver';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/entities/transaction.entity';
import { TransactionItem } from 'src/entities/transaction-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, TransactionItem])],
  providers: [TransactionService, TransactionResolver],
})
export class TransactionModule {}
