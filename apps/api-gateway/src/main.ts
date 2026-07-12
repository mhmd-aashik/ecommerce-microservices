import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { GrpcExceptionFilter } from './common/filters/grpc-exception.filter';
import { ApiResponseInterceptor } from './common/interceptors/api-response.interceptor';
import { Logger } from 'nestjs-pino';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new GrpcExceptionFilter());

  app.useGlobalInterceptors(new ApiResponseInterceptor());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ecommerce API Gateway')
    .setDescription('Enterprise ecommerce microservices API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/docs', app, swaggerDocument);

  const configService = app.get(ConfigService);

  const port = configService.get<number>('API_GATEWAY_PORT') || 3000;

  await app.listen(port);

  console.log(`API Gateway running on port ${port}`);
}
void bootstrap();
