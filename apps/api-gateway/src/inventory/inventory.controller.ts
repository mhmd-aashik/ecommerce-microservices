import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
import { StockChangeDto } from './dto/stock-change.dto';
import { ReserveStockDto } from './dto/reserve-stock.dto';
import { JwtAuthGuard, RolesGuard, Roles, AUTH_ROLES } from '@app/auth';

@Controller({
  path: 'inventory',
  version: '1',
})
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AUTH_ROLES.ADMIN)
  @Post('warehouses')
  createWarehouse(@Body() body: CreateWarehouseDto) {
    return this.inventoryService.createWarehouse(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AUTH_ROLES.ADMIN, AUTH_ROLES.SELLER)
  @Post('items')
  createInventoryItem(@Body() body: CreateInventoryItemDto) {
    return this.inventoryService.createInventoryItem(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('items/:productId/:warehouseId')
  getInventoryItem(
    @Param('productId') productId: string,
    @Param('warehouseId') warehouseId: string,
  ) {
    return this.inventoryService.getInventoryItem({ productId, warehouseId });
  }

  @UseGuards(JwtAuthGuard)
  @Get('stock/:productId/:warehouseId')
  getAvailableStock(
    @Param('productId') productId: string,
    @Param('warehouseId') warehouseId: string,
  ) {
    return this.inventoryService.getAvailableStock({ productId, warehouseId });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AUTH_ROLES.ADMIN, AUTH_ROLES.SELLER)
  @Patch('stock/increase')
  increaseStock(@Body() body: StockChangeDto) {
    return this.inventoryService.increaseStock(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AUTH_ROLES.ADMIN, AUTH_ROLES.SELLER)
  @Patch('stock/decrease')
  decreaseStock(@Body() body: StockChangeDto) {
    return this.inventoryService.decreaseStock(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AUTH_ROLES.ADMIN)
  @Post('stock/reserve')
  reserveStock(@Body() body: ReserveStockDto) {
    return this.inventoryService.reserveStock(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AUTH_ROLES.ADMIN)
  @Patch('reservations/:reservationId/release')
  releaseStock(@Param('reservationId') reservationId: string) {
    return this.inventoryService.releaseStock({ reservationId });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AUTH_ROLES.ADMIN)
  @Patch('reservations/:reservationId/confirm')
  confirmStock(@Param('reservationId') reservationId: string) {
    return this.inventoryService.confirmStock({ reservationId });
  }
}
