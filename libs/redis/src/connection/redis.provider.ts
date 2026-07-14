import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { REDIS_CLIENT } from '../tokens/redis.tokens';

export const redisProvider: Provider = {
  provide: REDIS_CLIENT,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const host = configService.getOrThrow<string>('REDIS_HOST');
    const port = configService.get<number>('REDIS_PORT') ?? 6379;

    return new Redis({
      host,
      port,
      lazyConnect: false,
      maxRetriesPerRequest: 3,
    });
  },
};
