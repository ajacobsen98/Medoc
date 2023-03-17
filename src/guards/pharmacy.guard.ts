// guards/pharmacy.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProductService } from '../services/product.services';
import { InventoryService } from '../services/inventory.services';

@Injectable()
export class PharmacyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly productService: ProductService,
    private readonly inventoryService: InventoryService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Check if the user has the "pharmacy" role
    if (user.role !== 'pharmacy') {
      return false;
    }

    // Check if the user is the owner of the product/inventory they are trying to update
    const productId = request.params.productId;
    const inventoryId = request.params.inventoryId;
    if (productId) {
      const product = await
