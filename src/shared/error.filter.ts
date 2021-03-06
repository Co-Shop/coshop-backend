import {
    Catch,
    ExceptionFilter,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();

        res.status(HttpStatus.BAD_REQUEST || exception.getStatus()).json({
            code: HttpStatus.BAD_REQUEST || exception.getStatus(),
            error: exception.name,
            message: exception.message,
            timestamp: new Date(),
        });
    }
}
