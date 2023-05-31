import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class FindTransItemArgs {
  @Field(() => Int, { defaultValue: 0, nullable: true })
  id?: number;

  @Field(() => Int, { defaultValue: 0, nullable: true })
  transactionId?: number;
}
