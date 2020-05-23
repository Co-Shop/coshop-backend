import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './shared/error.filter';
import { RequestsModule } from './requests/requests.module';
import { QuestionsModule } from './questions/questions.module';
import { ResponsesModule } from './responses/responses.module';
import { ProductsModule } from './products/products.module';
import { ShopsModule } from './shops/shops.module';
import { MailerModule, PugAdapter } from '@nest-modules/mailer';
import * as mailgun from 'nodemailer-mailgun-transport';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        AuthModule,
        UsersModule,
        RequestsModule,
        QuestionsModule,
        ResponsesModule,
        ProductsModule,
        ShopsModule,
        MailerModule.forRoot({
            transport: mailgun({ host: 'api.eu.mailgun.net', auth: {
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    api_key: process.env.MAILGUN_API_KEY,
                    domain: 'mg.coshop.org'
                },
                
            }),
            defaults: {
                from: '"no-reply" <noreply@coshop.org>'
            },
            template: {
                dir: __dirname + '/templates',
                adapter: new PugAdapter(),
                options: {
                    strict: true
                }
            }
        }),
    ],
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
