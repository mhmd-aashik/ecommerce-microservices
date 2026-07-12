import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import type {
  CreateCategoryRequest,
  CreateProductRequest,
  UpdateProductRequest,
} from './product-grpc.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('categories')
  createCategory(@Body() body: CreateCategoryRequest) {
    return this.productsService.createCategory(body);
  }

  @Get('categories')
  findAllCategories() {
    return this.productsService.findAllCategories();
  }

  @Post()
  createProduct(@Body() body: CreateProductRequest) {
    return this.productsService.createProduct(body);
  }

  @Get()
  findAllProducts() {
    return this.productsService.findAllProducts();
  }

  @Get(':id')
  findProductById(@Param('id') id: string) {
    return this.productsService.findProductById(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,

    @Body() body: Omit<UpdateProductRequest, 'id'>,
  ) {
    return this.productsService.updateProduct(id, body);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
