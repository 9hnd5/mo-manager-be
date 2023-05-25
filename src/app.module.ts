import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TransactionModule } from './modules/transaction/transaction.module';
import * as path from 'path';
import { DateScalar } from './scalars/date.scalar';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionFilter } from './common/exception.filter';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      formatError(error) {
        console.log('eeeee', error);
        return { message: error.message, errors: error.extensions };
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
  ],
  controllers: [],
  providers: [DateScalar, { provide: APP_FILTER, useClass: ExceptionFilter }],
})
export class AppModule {}
