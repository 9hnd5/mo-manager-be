import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/entities/category.entity';

@ObjectType()
export class FindFeeReportRes {
  @Field((type) => Int)
  totalIncome: number;

  @Field((type) => Int)
  totalExpense: number;

  @Field((type) => [Data])
  income: Data[];

  @Field((type) => [Data])
  expense: Data[];
}

@ObjectType()
class Data {
  @Field()
  category: Category;

  @Field((type) => Int)
  amount: number;

  @Field((type) => Float)
  percent: number;
}
