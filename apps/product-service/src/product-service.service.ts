import { DRIZZLE_DB } from '@app/database';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProductServiceService {
  constructor(@Inject(DRIZZLE_DB) private readonly db: any) {}
  getHello(): string {
    return 'Hello World!';
  }
}
