import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountService, AccountResolver],
  exports: [AccountService],
})
export class AccountModule {}
