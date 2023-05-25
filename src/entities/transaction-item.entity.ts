import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transaction } from './transaction.entity';

export enum TransItemType {
  income = 'income',
  expense = 'expense',
}

export enum TransItemAccount {
  bank = 'bank',
  credit = 'credit',
}

@ObjectType()
@Entity({ name: 'transaction-item' })
export class TransactionItem {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  @Column()
  amount: number;

  @Field()
  @Column({ type: 'enum', enum: TransItemAccount })
  account: TransItemAccount;

  @Field()
  @Column()
  category: string;

  @Field()
  @Column({ type: 'enum', enum: TransItemType })
  type: TransItemType;

  @JoinColumn()
  transactionId: number;

  @ManyToOne(() => Transaction, (item) => item.transactionItems, {
    onDelete: 'CASCADE',
  })
  transaction: Transaction;

  @Column({ nullable: true })
  note?: string;
}
