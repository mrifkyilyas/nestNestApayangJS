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

@Module({
  imports: [
    ProductModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
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
