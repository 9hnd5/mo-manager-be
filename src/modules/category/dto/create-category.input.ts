import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @IsNotEmpty()
  @Field()
  name: string;

  @IsNotEmpty()
  @Field()
  createdById: number;
}
