import { Observable } from 'rxjs';

export interface ProductGrpcService {
  createCategory(data: CreateCategoryRequest): Observable<CategoryResponse>;
  findAllCategories(data: Empty): Observable<CategoryListResponse>;

  createProduct(data: CreateProductRequest): Observable<ProductResponse>;
  findAllProducts(data: Empty): Observable<ProductListResponse>;
  findProductById(data: FindProductByIdRequest): Observable<ProductResponse>;
  updateProduct(data: UpdateProductRequest): Observable<ProductResponse>;
  deleteProduct(data: FindProductByIdRequest): Observable<ProductResponse>;
}

export type Empty = Record<string, never>;

export interface CreateCategoryRequest {
  name: string;
  slug: string;
  description?: string;
}

export interface CategoryResponse {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
}

export interface CategoryListResponse {
  categories: CategoryResponse[];
}

export interface CreateProductRequest {
  categoryId: string;
  name: string;
  slug: string;
  description?: string;
  price: string;
  sku: string;
}

export interface FindProductByIdRequest {
  id: string;
}

export interface UpdateProductRequest {
  id: string;
  categoryId?: string;
  name?: string;
  slug?: string;
  description?: string;
  price?: string;
  sku?: string;
}

export interface ProductResponse {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description?: string;
  price: string;
  sku: string;
  isActive: boolean;
}

export interface ProductListResponse {
  products: ProductResponse[];
}
