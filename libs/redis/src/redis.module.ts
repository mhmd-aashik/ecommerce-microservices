import { Global, Module } from '@nestjs/common';
import { redisProvider } from './connection/redis.provider';
import { CacheService } from './cache';
import { LockService } from './locks';

@Global()
@Module({
  providers: [redisProvider, LockService, CacheService],
  exports: [redisProvider, LockService, CacheService],
})
export class RedisModule {}
