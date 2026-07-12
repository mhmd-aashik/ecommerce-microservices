import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: join(process.cwd(), 'proto/user/user.proto'),
        url: process.env.USER_GRPC_URL || 'localhost:50056',
      },
    },
  );

  await app.listen();

  console.log('User gRPC service running on localhost:50056');
}
void bootstrap();
