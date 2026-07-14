import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import Redis from 'ioredis';
import { REDIS_CLIENT } from '../tokens/redis.tokens';

@Injectable()
export class LockService {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async acquire(
    key: string,
    ttlMs: number,
  ): Promise<{ key: string; token: string } | null> {
    const token = randomUUID();

    const result = await this.redis.set(key, token, 'PX', ttlMs, 'NX');

    if (result !== 'OK') {
      return null;
    }

    return { key, token };
  }

  async release(lock: { key: string; token: string }): Promise<boolean> {
    const script = `
      if redis.call("GET", KEYS[1]) == ARGV[1] then
        return redis.call("DEL", KEYS[1])
      else
        return 0
      end
    `;

    const result = await this.redis.eval(script, 1, lock.key, lock.token);

    return result === 1;
  }
}
