import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('categories')
  createCategory(@Body() body: CreateCategoryDto) {
    return this.productsService.createCategory(body);
  }

  @Get('categories')
  findAllCategories() {
    return this.productsService.findAllCategories();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('seller', 'admin')
  @Post()
  createProduct(@Body() body: CreateProductDto) {
    return this.productsService.createProduct(body);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAllProducts() {
    return this.productsService.findAllProducts();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('seller', 'admin')
  @Patch(':id')
  findProductById(@Param('id') id: string) {
    return this.productsService.findProductById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('seller', 'admin')
  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return this.productsService.updateProduct(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
