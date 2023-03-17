import { Injectable } from '@nestjs/common';
import { Inventory } from '../models/inventory.model';
import { firestore } from '../config/firebase.config';

@Injectable()
export class InventoryService {
  private readonly inventoryCollection = firestore.collection('inventory');

  async createInventory(inventory: Inventory): Promise<Inventory> {
    const newInventory: Omit<Inventory, 'id'> = {
      ...inventory,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const inventoryRef = await this.inventoryCollection.add(newInventory);
    const inventorySnapshot = await inventoryRef.get();
    const savedInventory: Inventory = {
      id: inventorySnapshot.id,
      ...newInventory,
    };
    return savedInventory;
  }

  async getInventoryById(id: string): Promise<Inventory | null> {
    const inventorySnapshot = await this.inventoryCollection.doc(id).get();
    if (inventorySnapshot.exists) {
      const inventoryData = inventorySnapshot.data();
      const inventory: Inventory = {
        id: inventorySnapshot.id,
        productVariant: inventoryData.productVariant,
        pharmacy: inventoryData.pharmacy,
        quantity: inventoryData.quantity,
        createdAt: inventoryData.createdAt.toDate(),
        updatedAt: inventoryData.updatedAt.toDate(),
      };
      return inventory;
    }
    return null;
  }

  async updateInventory(id: string, updatedInventory: Partial<Inventory>): Promise<Inventory> {
    await this.inventoryCollection.doc(id).update({
      ...updatedInventory,
      updated_at: new Date(),
    });
    const inventorySnapshot = await this.inventoryCollection.doc(id).get();
    const inventoryData = inventorySnapshot.data();
    const inventory: Inventory = {
      id: inventorySnapshot.id,
      productVariant: inventoryData.productVariant,
      pharmacy: inventoryData.pharmacy,
      quantity: inventoryData.quantity,
      createdAt: inventoryData.createdAt.toDate(),
      updatedAt: inventoryData.updatedAt.toDate(),
    };
    return inventory;
  }

  async deleteInventory(id: string): Promise<boolean> {
    try {
      await this.inventoryCollection.doc(id).delete();
      return true;
    } catch (error) {
      // Handle the error appropriately, e.g., log it
      return false;
    }
  }
  
}
