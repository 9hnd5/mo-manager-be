import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { TransactionItem } from 'src/entities/transaction-item.entity';
import { CategoryService } from '../category/category.service';
import { TransactionItemService } from './transaction-item.service';
import { UpdateTransactionItemInput } from './dto/update-transaction-item.input';
import { CreateTransactionItemInput } from './dto/create-transaction-item.input';

@Resolver((of) => TransactionItem)
export class TransactionItemResolver {
  constructor(
    private categoryService: CategoryService,
    private transItemService: TransactionItemService,
  ) {}

  @Mutation((returns) => TransactionItem)
  deteleTransactionItem(@Args('id', { type: () => Int }) id: number) {
    return this.transItemService.delete(id);
  }

  @Mutation((returns) => TransactionItem)
  updateTransactionItem(@Args('input') input: UpdateTransactionItemInput) {
    return this.transItemService.update(input);
  }

  @Mutation((returns) => TransactionItem)
  createTransactionItem(@Args('input') input: CreateTransactionItemInput) {
    return this.transItemService.create(input);
  }
}
