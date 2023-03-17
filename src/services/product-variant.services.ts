import { Injectable } from '@nestjs/common';
import { ProductVariant } from '../models/product-variant.model';
import { firestore } from '../config/firebase.config';

@Injectable()
export class ProductVariantService {
  private readonly productVariantCollection = firestore.collection('productVariants');

  async createProductVariant(productVariant: ProductVariant): Promise<ProductVariant> {
    const newProductVariant: Omit<ProductVariant, 'id'> = {
      ...productVariant,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const productVariantRef = await this.productVariantCollection.add(newProductVariant);
    const productVariantSnapshot = await productVariantRef.get();
    const savedProductVariant: ProductVariant = {
      id: productVariantSnapshot.id,
      ...newProductVariant,
    };
    return savedProductVariant;
  }

  async getProductVariantById(id: string): Promise<ProductVariant | null> {
    const productVariantSnapshot = await this.productVariantCollection.doc(id).get();
    if (productVariantSnapshot.exists) {
      const productVariantData = productVariantSnapshot.data();
      const productVariant: ProductVariant = {
          id: productVariantSnapshot.id,
          product: productVariantData.product,
          name: productVariantData.name,
          price: productVariantData.price,
          createdAt: productVariantData.createdAt.toDate(),
          updatedAt: productVariantData.updatedAt.toDate(),
          sku: ''
      };
      return productVariant;
    }
    return null;
  }

  async updateProductVariant(id: string, updatedProductVariant: Partial<ProductVariant>): Promise<ProductVariant> {
    await this.productVariantCollection.doc(id).update({
      ...updatedProductVariant,
      updated_at: new Date(),
    });
    const productVariantSnapshot = await this.productVariantCollection.doc(id).get();
    const productVariantData = productVariantSnapshot.data();
    const productVariant: ProductVariant = {
        id: productVariantSnapshot.id,
        product: productVariantData.product,
        name: productVariantData.name,
        price: productVariantData.price,
        createdAt: productVariantData.createdAt.toDate(),
        updatedAt: productVariantData.updatedAt.toDate(),
        sku: ''
    };
    return productVariant;
  }

  async deleteProductVariant(id: string): Promise<boolean> {
    try {
      await this.productVariantCollection.doc(id).delete();
      return true;
    } catch (error) {
      // Handle the error appropriately, e.g., log it
      return false;
    }
  }
}