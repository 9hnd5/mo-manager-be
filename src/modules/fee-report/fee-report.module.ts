import { Module } from '@nestjs/common';
import { FeeReportService } from './fee-report.service';
import { FeeReportResolver } from './fee-report.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/entities/transaction.entity';
import { TransactionItem } from 'src/entities/transaction-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, TransactionItem])],
  providers: [FeeReportService, FeeReportResolver],
})
export class FeeReportModule {}
