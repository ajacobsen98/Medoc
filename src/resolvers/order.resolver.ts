import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { OrderService } from '../services/order.services';
import { Order } from '../models/order.model';
import { CreateOrderInput } from '../dto/create-order.input';
import { UpdateOrderInput } from '../dto/update-order.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(GqlAuthGuard)

  @Query(() => Order, { nullable: true })
  async order(@Args('id') id: string): Promise<Order | null> {
    return this.orderService.getOrderById(id); 
  }

  @Mutation(() => Order)
  async createOrder(@Args('input') input: Order): Promise<Order> {
    return this.orderService.createOrder(input);
  }

  @Mutation(() => Order, { nullable: true })
  async updateOrder(@Args('id') id: string, @Args('input') input: Order): Promise<Order | null> {
    return this.orderService.updateOrder(id, input);
  }

  @Mutation(() => Boolean)
  async deleteOrder(@Args('id') id: string): Promise<boolean> {
    return this.orderService.deleteOrder(id);
  }
}
