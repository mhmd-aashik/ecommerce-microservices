import { IsInt, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateInventoryItemDto {
  @IsUUID()
  productId: string;

  @IsUUID()
  warehouseId: string;

  @IsInt()
  @Min(0)
  quantityOnHand: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  reorderLevel?: number;
}
