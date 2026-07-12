import { Controller } from '@nestjs/common';
import { ProductServiceService } from './product-service.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('products')
export class ProductServiceController {
  constructor(private readonly productService: ProductServiceService) {}

  // @Post('categories')
  // createCategory(@Body(new ValidationPipe()) dto: CreateCategoryDto) {
  //   return this.productService.createCategory(dto);
  // }

  // @Get('categories')
  // findAllCategories() {
  //   return this.productService.findAllCategories();
  // }

  // @Post()
  // createProduct(@Body(new ValidationPipe()) dto: CreateProductDto) {
  //   return this.productService.createProduct(dto);
  // }

  @GrpcMethod('ProductService', 'CreateCategory')
  async createCategory(data: {
    name: string;
    slug: string;
    description: string;
  }) {
    return this.productService.createCategory(data);
  }

  @GrpcMethod('ProductService', 'FindAllCategories')
  async findAllCategories() {
    const categories = await this.productService.findAllCategories();
    return { categories };
  }

  @GrpcMethod('ProductService', 'CreateProduct')
  async createProduct(data: {
    categoryId: string;
    name: string;
    slug: string;
    description?: string;
    price: string;
    sku: string;
  }) {
    return this.productService.createProduct(data);
  }

  @GrpcMethod('ProductService', 'FindAllProducts')
  async findAllProducts() {
    const products = await this.productService.findAllProducts();
    return { products };
  }

  @GrpcMethod('ProductService', 'FindProductById')
  async findProductById(data: { id: string }) {
    return this.productService.findProductById(data.id);
  }

  @GrpcMethod('ProductService', 'UpdateProduct')
  async updateProduct(data: {
    id: string;
    categoryId?: string;
    name?: string;
    slug?: string;
    description?: string;
    price?: string;
    sku?: string;
  }) {
    const { id, ...dto } = data;
    return this.productService.updateProduct(id, dto);
  }

  @GrpcMethod('ProductService', 'DeleteProduct')
  async deleteProduct(data: { id: string }) {
    return this.productService.deleteProduct(data.id);
  }
}
