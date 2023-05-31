import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transaction } from './transaction.entity';
import { Category } from './category.entity';
import { Account } from './account.entity';

export enum TransItemType {
  income = 'income',
  expense = 'expense',
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

  @Field((type) => Account)
  @Column({ type: 'json' })
  account: Account;

  @Field((type) => Category)
  @Column({ type: 'json' })
  category: Category;

  @Field()
  @Column({ type: 'enum', enum: TransItemType })
  type: TransItemType;

  @Field(() => Int)
  @Column()
  transactionId: number;

  @ManyToOne(() => Transaction, (item) => item.transactionItems, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'transactionId' })
  transaction: Transaction;

  @Field()
  @Column({ nullable: true })
  note?: string;
}
