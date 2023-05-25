import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import {
  TransItemAccount,
  TransItemType,
} from 'src/entities/transaction-item.entity';

@InputType()
export class CreateTransactionInput {
  @Field(() => Date)
  @IsDateString()
  date: Date;

  @Field(() => Int)
  @IsNumber()
  amount: number;

  @Field()
  @IsEnum(TransItemType)
  type: TransItemType;

  @Field()
  @IsNotEmpty()
  category: string;

  @Field()
  @IsEnum(TransItemAccount)
  account: TransItemAccount;

  @Field({ nullable: true })
  @IsOptional()
  note?: string;
}
