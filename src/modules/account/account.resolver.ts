import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Account } from 'src/entities/account.entity';
import { AccountService } from './account.service';
import { FindAccountsArgs } from './dto/find-accounts.args';
import { CreateAccountInput } from './dto/create-account.input';

@Resolver((of) => Account)
export class AccountResolver {
  constructor(private categoryService: AccountService) {}

  @Query((returns) => [Account])
  accounts(@Args() args: FindAccountsArgs) {
    return this.categoryService.find(args);
  }

  @Mutation((returns) => Account)
  createAccount(@Args('input') input: CreateAccountInput) {
    return this.categoryService.create(input);
  }

  @Mutation((returns) => Account)
  deleteAccount(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.delete(id);
  }
}
