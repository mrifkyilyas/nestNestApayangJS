import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { accountProviders } from './account.provider';

@Module({
    imports: [DatabaseModule],
    controllers: [AccountController],
    providers: [AccountService, ...accountProviders]
})
export class AccountModule { }
