import { Injectable } from '@nestjs/common';
import { Product } from '../models/product.model';
import { firestore } from '../config/firebase.config';

@Injectable()
export class ProductService {
  private productsCollection = firestore.collection('products');

  async createProduct(product: Product): Promise<Product> {
    const newProduct = {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const productRef = await this.productsCollection.add(newProduct);
    newProduct.id = productRef.id;

    return newProduct;
  }

  async getProductById(id: string): Promise<Product | null> {
    const productRef = this.productsCollection.doc(id);
    const productDoc = await productRef.get();

    if (productDoc.exists) {
      const productData = productDoc.data() as Product;
      return {
        id: productDoc.id,
        name: productData.name,
        description: productData.description,
        category: productData.category,
        price: productData.price,
        imageUrl: productData.imageUrl,
        pharmacy: productData.pharmacy,
        createdAt: productData.createdAt,
        updatedAt: productData.updatedAt,
      };
    } else {
      return null;
    }
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const productRef = this.productsCollection.doc(id);
    const productDoc = await productRef.get();

    if (productDoc.exists) {
      await productRef.update({ ...updates, updatedAt: new Date() });
      const updatedProductDoc = await productRef.get();
      const updatedProductData = updatedProductDoc.data() as Product;
      return {
        id: updatedProductDoc.id,
        name: updatedProductData.name,
        description: updatedProductData.description,
        category: updatedProductData.category,
        price: updatedProductData.price,
        imageUrl: updatedProductData.imageUrl,
        pharmacy: updatedProductData.pharmacy,
        createdAt: updatedProductData.createdAt,
        updatedAt: updatedProductData.updatedAt,
      };
    } else {
      return null;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    const productRef = this.productsCollection.doc(id);
    const productDoc = await productRef.get();

    if (productDoc.exists) {
      await productRef.delete();
      return true;
    } else {
      return false;
    }
  }
}
