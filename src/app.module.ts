import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './shared/error.filter';
import { RequestsModule } from './requests/requests.module';
import { QuestionsModule } from './questions/questions.module';
import { ResponsesModule } from './responses/responses.module';
import { ProductsModule } from './products/products.module';
import { ShopsModule } from './shops/shops.module';

@Module({
    imports: [TypeOrmModule.forRoot(), AuthModule, UsersModule, RequestsModule, QuestionsModule, ResponsesModule, ProductsModule, ShopsModule],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: HttpErrorFilter,
        },
    ],
})
export class AppModule {}
