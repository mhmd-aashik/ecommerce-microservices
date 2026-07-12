import { DRIZZLE_DB } from '@app/database';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './categories/dto/create-category.dto';
import { categories, products } from './db/schema';
import type { ProductDatabase } from './db';
import { and, eq } from 'drizzle-orm';
import { CreateProductDto } from './products/dto/create-product.dto';

@Injectable()
export class ProductServiceService {
  constructor(@Inject(DRIZZLE_DB) private readonly db: ProductDatabase) {}

  async createCategory(dto: CreateCategoryDto) {
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
