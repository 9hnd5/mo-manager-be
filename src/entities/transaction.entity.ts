import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionItem } from './transaction-item.entity';

@ObjectType()
@Entity({ name: 'transaction' })
export class Transaction {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  date: Date;

  @Field(() => Int)
  @Column()
  income: number;

  @Field(() => Int)
  @Column()
  expense: number;

  @Field(() => Int)
  @Column()
  createdById: number;

  @Field(() => [TransactionItem], { nullable: 'items' })
  @OneToMany(() => TransactionItem, (item) => item.transaction, {
    cascade: true,
  })
  transactionItems: TransactionItem[];
}
