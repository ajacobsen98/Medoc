import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { InventoryService } from '../services/inventory.services';
import { Inventory } from '../models/inventory.model';
import { CreateInventoryInput } from '../dto/create-inventory.input';
import { UpdateInventoryInput } from '../dto/update-inventory.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver(() => Inventory)
export class InventoryResolver {
  constructor(private readonly inventoryService: InventoryService) {}

  @UseGuards(GqlAuthGuard)

  @Query(() => Inventory, { nullable: true })
  async inventory(@Args('id') id: string): Promise<Inventory | null> {
    return this.inventoryService.getInventoryById(id);
  }

  @Mutation(() => Inventory)
  async createInventory(@Args('input') input: Inventory): Promise<Inventory> {
    return this.inventoryService.createInventory(input);
  }

  @Mutation(() => Inventory, { nullable: true })
  async updateInventory(@Args('id') id: string, @Args('input') input: Inventory): Promise<Inventory | null> {
    return this.inventoryService.updateInventory(id, input);
  }

  @Mutation(() => Boolean)
  async deleteInventory(@Args('id') id: string): Promise<boolean> {
    return this.inventoryService.deleteInventory(id);
  }
}
