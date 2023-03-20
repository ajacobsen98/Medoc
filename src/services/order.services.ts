import { Injectable } from '@nestjs/common';
import { Order } from '../models/order.model';
import { firestore } from '../config/firebase.config';

@Injectable()
export class OrderService {
  private readonly orderCollection = firestore.collection('orders');

  async createOrder(order: Order): Promise<Order> {
    const newOrder: Omit<Order, 'id'> = {
      ...order,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const orderRef = await this.orderCollection.add(newOrder);
    const orderSnapshot = await orderRef.get();
    const savedOrder: Order = {
      id: orderSnapshot.id,
      ...newOrder,
    };
    return savedOrder;
  }

  async getOrderById(id: string): Promise<Order | null> {
    const orderSnapshot = await this.orderCollection.doc(id).get();
    if (orderSnapshot.exists) {
      const orderData = orderSnapshot.data();
      const order: Order = {
        id: orderSnapshot.id,
        user: orderData.user,
        status: orderData.status,
        total: orderData.total,
        createdAt: orderData.createdAt.toDate(),
        updatedAt: orderData.updatedAt.toDate(),
      };
      return order;
    }
    return null;
  }

  async updateOrder(id: string, updatedOrder: Partial<Order>): Promise<Order> {
    await this.orderCollection.doc(id).update({
      ...updatedOrder,
      updated_at: new Date(),
    });
    const orderSnapshot = await this.orderCollection.doc(id).get();
    const orderData = orderSnapshot.data();
    const order: Order = {
      id: orderSnapshot.id,
      user: orderData.user,
      status: orderData.status,
      total: orderData.total,
      createdAt: orderData.createdAt.toDate(),
      updatedAt: orderData.updatedAt.toDate(),
    };
    return order;
  }

  async deleteOrder(id: string): Promise<boolean> {
    try {
      await this.orderCollection.doc(id).delete();
      return true;
    } catch (error) {
      // Handle the error appropriately, e.g., log it
      return false;
    }
  }
  
}
