import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class FindTransactionsArgs {
  @Field(() => Int, { defaultValue: 0, nullable: true })
  createdById?: number;
}
