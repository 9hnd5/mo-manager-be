import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TransactionModule } from './modules/transaction/transaction.module';
import * as path from 'path';
import { DateScalar } from './scalars/date.scalar';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionFilter } from './common/exception.filter';
import { CategoryModule } from './modules/category/category.module';
import { TransactionItemModule } from './modules/transaction-item/transaction-item.module';
import { GraphQLError } from 'graphql';
import { AccountModule } from './modules/account/account.module';
import { FeeReportModule } from './modules/fee-report/fee-report.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      formatError(error: GraphQLError) {
        console.error(error);
        return {
          message:
            (error?.extensions?.originalError as any)?.message || error.message,
        };
      },
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'mo-manager',
      entities: [__dirname + '/entities/*.{ts,js}'],
      synchronize: false,
    }),
    TransactionModule,
    TransactionItemModule,
    CategoryModule,
    AccountModule,
    FeeReportModule,
  ],
  controllers: [],
  providers: [DateScalar, { provide: APP_FILTER, useClass: ExceptionFilter }],
})
export class AppModule {}
