import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { usersController } from './users.controller';
import { UsersService } from './users.service';
import { usersSchema } from './schemas/users.schema'
import { usersProviders } from './users.provider'
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module'
@Module({
    imports: [
        DatabaseModule,
        forwardRef(() => AuthModule)
    ],
    controllers: [usersController],
    providers: [UsersService, ...usersProviders],
    exports: [UsersService]
})
export class UsersModule { }
