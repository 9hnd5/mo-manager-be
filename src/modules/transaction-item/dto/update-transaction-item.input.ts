import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateTransactionItemInput } from './create-transaction-item.input';

@InputType()
export class UpdateTransactionItemInput extends CreateTransactionItemInput {
  @Field(() => Int)
  id: number;
}
