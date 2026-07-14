import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),

  API_GATEWAY_PORT: Joi.number().default(3000),

  PRODUCT_GRPC_URL: Joi.string().required(),
  ORDER_GRPC_URL: Joi.string().required(),
  INVENTORY_GRPC_URL: Joi.string().required(),
  CART_GRPC_URL: Joi.string().required(),
  PAYMENT_GRPC_URL: Joi.string().required(),
  USER_GRPC_URL: Joi.string().required(),
  NOTIFICATION_GRPC_URL: Joi.string().required(),

  PRODUCT_DATABASE_URL: Joi.string().required(),
  ORDER_DATABASE_URL: Joi.string().required(),
  INVENTORY_DATABASE_URL: Joi.string().required(),
  CART_DATABASE_URL: Joi.string().required(),
  PAYMENT_DATABASE_URL: Joi.string().required(),
  USER_DATABASE_URL: Joi.string().required(),
  NOTIFICATION_DATABASE_URL: Joi.string().required(),

  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_PASSWORD: Joi.string().allow('').optional(),

  KAFKA_BROKER: Joi.string().required(),

  KEYCLOAK_BASE_URL: Joi.string().required(),
  KEYCLOAK_REALM: Joi.string().required(),
  KEYCLOAK_CLIENT_ID: Joi.string().required(),

  LOG_LEVEL: Joi.string()
    .valid('fatal', 'error', 'warn', 'info', 'debug', 'trace')
    .default('info'),
  LOG_PRETTY: Joi.boolean().default(false),
});
