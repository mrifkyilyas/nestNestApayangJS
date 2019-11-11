import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/products.modules'
import { LoggerMiddleware } from './middleware/logger.middleware';
import { HttpExceptionFilter } from './common/http-exception.filter'
import { APP_FILTER } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.modules'
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core'
import { RolesGuard } from './common/roles.guard'
import { CatsModule } from './cats/cats.modules';
import { DogsModule } from './dogs/dogs.modules';
import { AnimalModule } from './animal/animal.module';

@Module({
  imports: [
    ProductModule, UsersModule, AuthModule, CatsModule, DogsModule, AnimalModule],
  controllers: [AppController],
  providers: [AppService,
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard
    // }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('products')
  }
}
