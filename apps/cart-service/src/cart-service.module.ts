import { Module } from '@nestjs/common';
import { CartServiceController } from './cart-service.controller';
import { CartServiceService } from './cart-service.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [CartServiceController],
  providers: [CartServiceService],
})
export class CartServiceModule {}
