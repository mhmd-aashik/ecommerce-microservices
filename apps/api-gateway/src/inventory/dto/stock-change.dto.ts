import { IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class StockChangeDto {
  @IsUUID()
  productId: string;

  @IsUUID()
  warehouseId: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsString()
  reason?: string;
}
