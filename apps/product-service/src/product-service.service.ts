import { DRIZZLE_DB } from '@app/database';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './categories/dto/create-category.dto';
import { categories, products } from './db/schema';
import type { ProductDatabase } from './db';
import { and, eq, or } from 'drizzle-orm';
import { CreateProductDto } from './products/dto/create-product.dto';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import {
  KAFKA_TOPICS,
  KafkaProducerService,
  ProductCreatedPayload,
} from '@app/kafka';

@Injectable()
export class ProductServiceService {
  constructor(
    @Inject(DRIZZLE_DB) private readonly db: ProductDatabase,
    private readonly kafkaProducer: KafkaProducerService,
  ) {}

  async createCategory(dto: CreateCategoryDto) {
    const [existingCategory] = await this.db
      .select()
      .from(categories)
      .where(eq(categories.slug, dto.slug));

    if (existingCategory) {
      throw new RpcException({
        code: status.ALREADY_EXISTS,
        message: 'Category slug already exists',
      });
    }

    const [category] = await this.db
      .insert(categories)
      .values({
        name: dto.name,
        slug: dto.slug,
        description: dto.description,
      })
      .returning();

    return category;
  }

  async findAllCategories() {
    return this.db
      .select()
      .from(categories)
      .where(eq(categories.isActive, true));
  }

  async createProduct(dto: CreateProductDto) {
    const [existingProduct] = await this.db
      .select()
      .from(products)
      .where(or(eq(products.slug, dto.slug), eq(products.sku, dto.sku)));

    if (existingProduct) {
      if (existingProduct.slug === dto.slug) {
        throw new RpcException({
          code: status.ALREADY_EXISTS,
          message: 'Product slug already exists',
        });
      }

      if (existingProduct.sku === dto.sku) {
        throw new RpcException({
          code: status.ALREADY_EXISTS,
          message: 'Product SKU already exists',
        });
      }
    }

    const [product] = await this.db
      .insert(products)
      .values({
        categoryId: dto.categoryId,
        name: dto.name,
        slug: dto.slug,
        description: dto.description,
        price: dto.price,
        sku: dto.sku,
      })
      .returning();

    const payload: ProductCreatedPayload = {
      productId: product.id,
      name: product.name,
      sku: product.sku,
      price: product.price,
    };

    await this.kafkaProducer.publish(KAFKA_TOPICS.PRODUCT_CREATED, payload, {
      key: product.id,
      eventType: KAFKA_TOPICS.PRODUCT_CREATED,
    });

    return product;
  }

  async findAllProducts() {
    return this.db.select().from(products).where(eq(products.isActive, true));
  }

  async findProductById(id: string) {
    const [product] = await this.db
      .select()
      .from(products)
      .where(and(eq(products.id, id), eq(products.isActive, true)));
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async updateProduct(id: string, dto: Partial<CreateProductDto>) {
    await this.findProductById(id);
    const [product] = await this.db
      .update(products)
      .set({
        ...dto,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();

    return product;
  }

  async deleteProduct(id: string) {
    await this.findProductById(id);
    const [product] = await this.db
      .update(products)
      .set({
        isActive: false,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();

    return product;
  }
}
