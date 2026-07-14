import { Global, Module } from '@nestjs/common';
import { kafkaClientProvider, kafkaProducerProvider } from './kafka.provider';
import { KafkaProducerService } from '../producers/kafka-producer.service';

@Global()
@Module({
  providers: [kafkaClientProvider, kafkaProducerProvider, KafkaProducerService],
  exports: [kafkaClientProvider, kafkaProducerProvider, KafkaProducerService],
})
export class KafkaModule {}
