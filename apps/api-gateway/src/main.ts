import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { GrpcExceptionFilter } from './common/filters/grpc-exception.filter';
import { ApiResponseInterceptor } from './common/interceptors/api-response.interceptor';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('API_GATEWAY_PORT') || 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new GrpcExceptionFilter());

  app.useGlobalInterceptors(new ApiResponseInterceptor());

  app.useLogger(app.get(Logger));

  await app.listen(port);
  console.log(`API Gateway running on port ${port}`);
}
void bootstrap();
