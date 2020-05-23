import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class AppService {

    constructor(private readonly mailerService: MailerService) {}

    getHello(): string {

        this.mailerService.sendMail({
            to: 'Tomasz Marszalec <tomek.marszalec@gmail.com>',
            subject: 'Email confirmation',
            template: 'confirm',
            context: {
                link: 'https://coshop.org/verify&code=pozdrawiam'
            }
        });

        return 'Hello World!';
    }
}
