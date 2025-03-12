import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationErrorFilter } from './filters/validation-error.filter';
import { TransformResponseInterceptor } from './interceptors/transform-response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig, customOptions } from './utils/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new ValidationErrorFilter());
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  app.use(helmet());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    }),
  );

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const port = configService.get<number>('SERVER_PORT') || 3000;

  await app.listen(port, () => {
    console.log('app is listening on port:', port);
  });
}
bootstrap();
