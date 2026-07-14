import { Global, Module } from '@nestjs/common';
import { kafkaClientProvider, kafkaProducerProvider } from './kafka.provider';
import { KafkaProducerService } from '../producers/kafka-producer.service';
import { KafkaConsumerService } from '../consumers';

@Global()
@Module({
  providers: [
    kafkaClientProvider,
    kafkaProducerProvider,
    KafkaProducerService,
    KafkaConsumerService,
  ],
  exports: [
    kafkaClientProvider,
    kafkaProducerProvider,
    KafkaProducerService,
    KafkaConsumerService,
  ],
})
export class KafkaModule {}
