import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductService } from './products.services';
import { ProductsSchema } from './schemas/products.schema'
import { productsProviders} from './products.provider'
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from '../users/users.provider';
import { catsProviders } from '../cats/cats.providers';
import { DogsProviders } from '../dogs/dogs.providers';
@Module({
    imports: [DatabaseModule],
    controllers: [ProductsController],
    providers: [ProductService, ...productsProviders,...usersProviders,...catsProviders,...DogsProviders],
})
export class ProductModule { }
