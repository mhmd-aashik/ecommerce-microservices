import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateCategoryRequest,
  CreateProductRequest,
  FindProductByIdRequest,
  ProductGrpcService,
  UpdateProductRequest,
} from './product-grpc.interface';
import type { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PRODUCT_PACKAGE } from '@app/common';

@Injectable()
export class ProductsService implements OnModuleInit {
  private productGrpcService: ProductGrpcService;

  constructor(@Inject(PRODUCT_PACKAGE) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.productGrpcService =
      this.client.getService<ProductGrpcService>('ProductService');
  }

  createCategory(data: CreateCategoryRequest) {
    return lastValueFrom(this.productGrpcService.createCategory(data));
  }

  findAllCategories() {
    return lastValueFrom(this.productGrpcService.findAllCategories({}));
  }

  createProduct(data: CreateProductRequest) {
    return lastValueFrom(this.productGrpcService.createProduct(data));
  }

  findAllProducts() {
    return lastValueFrom(this.productGrpcService.findAllProducts({}));
  }

  findProductById(id: string) {
    const data: FindProductByIdRequest = { id };
    return lastValueFrom(this.productGrpcService.findProductById(data));
  }

  updateProduct(id: string, data: Omit<UpdateProductRequest, 'id'>) {
    return lastValueFrom(
      this.productGrpcService.updateProduct({
        id,

        ...data,
      }),
    );
  }

  deleteProduct(id: string) {
    return lastValueFrom(this.productGrpcService.deleteProduct({ id }));
  }
}
