import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class FindCategoryArgs {
  @Field(() => Int, { defaultValue: 0, nullable: true })
  id: number;

  @Field(() => Int, { defaultValue: 0, nullable: true })
  createdById?: number;
}
