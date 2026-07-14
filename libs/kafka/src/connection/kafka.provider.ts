import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka } from 'kafkajs';
import { KAFKA_CLIENT, KAFKA_PRODUCER } from '../tokens/kafka.tokens';

export const kafkaClientProvider: Provider = {
  provide: KAFKA_CLIENT,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const broker = configService.getOrThrow<string>('KAFKA_BROKER');

    return new Kafka({
      clientId: 'ecommerce-platform',
      brokers: [broker],
    });
  },
};

export const kafkaProducerProvider: Provider = {
  provide: KAFKA_PRODUCER,
  inject: [KAFKA_CLIENT],
  useFactory: (kafka: Kafka) => kafka.producer(),
};
