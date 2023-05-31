import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { TransItemType } from 'src/entities/transaction-item.entity';

@InputType()
export class CreateTransactionItemInput {
  @Field(() => Date)
  date: Date;

  @Field(() => Int)
  @IsNumber()
  amount: number;

  @Field()
  @IsEnum(TransItemType)
  type: TransItemType;

  @Field(() => Int)
  @IsNotEmpty()
  categoryId: number;

  @Field(() => Int)
  accountId: number;

  @Field({ nullable: true })
  @IsOptional()
  note?: string;
}
