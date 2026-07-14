import { Global, Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { createPinoConfig } from './logger.factory';
import { AppLogger } from './app-logger.service';

@Global()
@Module({
  imports: [PinoLoggerModule.forRoot(createPinoConfig())],
  providers: [AppLogger],
  exports: [PinoLoggerModule, AppLogger],
})
export class LoggerModule {}
