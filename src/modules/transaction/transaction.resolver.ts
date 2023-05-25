import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Transaction } from 'src/entities/transaction.entity';
import { FindTransactionsArgs } from './dto/find-transactions.args';
import { TransactionService } from './transaction.service';
import { TransactionItem } from 'src/entities/transaction-item.entity';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { NotFoundException } from '@nestjs/common';

@Resolver((of) => Transaction)
export class TransactionResolver {
  constructor(private transService: TransactionService) {}

  @Query((returns) => [Transaction])
  async transactions(@Args() args: FindTransactionsArgs) {
    return this.transService.find(args);
  }

  @ResolveField((returns) => [TransactionItem])
  async transactionItems(@Parent() trans: Transaction) {
    const { id } = trans;
    return this.transService.findTransItems(id);
  }

  @Mutation((returns) => Transaction)
  async createTransaction(@Args('input') input: CreateTransactionInput) {
    // throw new NotFoundException({ message: 123 });
    return this.transService.create(input);
  }
}
