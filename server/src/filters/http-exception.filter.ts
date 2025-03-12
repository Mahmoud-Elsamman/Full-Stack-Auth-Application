import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException, UnauthorizedException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message: any = exception.getResponse();

    response.status(status).json({
      code: status,
      isError: true,
      status: 'Failure',
      message: Array.isArray(message.message)
        ? message.message[0]
        : message.message,
      data: null,
    });
  }
}
