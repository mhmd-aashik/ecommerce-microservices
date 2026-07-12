import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ProductServiceService } from './product-service.service';
import { CreateCategoryDto } from './categories/dto/create-category.dto';
import { CreateProductDto } from './products/dto/create-product.dto';

@Controller('products')
export class ProductServiceController {
  constructor(private readonly productService: ProductServiceService) {}

  @Post('categories')
  createCategory(@Body(new ValidationPipe()) dto: CreateCategoryDto) {
    return this.productService.createCategory(dto);
  }

  @Get('categories')
  findAllCategories() {
    return this.productService.findAllCategories();
  }

  @Post()
  createProduct(@Body(new ValidationPipe()) dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }
}
