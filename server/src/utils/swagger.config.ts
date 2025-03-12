import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const customOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
};

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Auth API')
  .setDescription('Authentication API documentation')
  .setVersion('1.0')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    'access-token',
  )
  .addApiKey(
    { type: 'apiKey', scheme: 'X-API-KEY', name: 'X-API-KEY', in: 'header' },
    'X-API-KEY',
  )
  .build();
