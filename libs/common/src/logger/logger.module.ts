import { Global, Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { createPinoConfig } from './logger.factory';

@Global()
@Module({
  imports: [PinoLoggerModule.forRoot(createPinoConfig())],
  exports: [PinoLoggerModule],
})
export class LoggerModule {}
