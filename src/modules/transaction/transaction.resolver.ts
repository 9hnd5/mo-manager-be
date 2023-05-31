import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TransactionItem } from 'src/entities/transaction-item.entity';
import { Transaction } from 'src/entities/transaction.entity';
import { TransactionItemService } from '../transaction-item/transaction-item.service';
import { FindTransactionsArgs } from './dto/find-transactions.args';
import { TransactionService } from './transaction.service';

@Resolver((of) => Transaction)
export class TransactionResolver {
  constructor(
    private transService: TransactionService,
    private transItemService: TransactionItemService,
  ) {}

  @Query((returns) => [Transaction])
  async transactions(@Args() args: FindTransactionsArgs) {
    return this.transService.find(args);
  }

  @ResolveField((returns) => [TransactionItem])
  async transactionItems(@Parent() trans: Transaction) {
    const { id: transactionId } = trans;
    return this.transItemService.find({ transactionId });
  }
}
