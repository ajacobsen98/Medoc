import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from './user.model';

export enum OrderStatus {
  PLACED = 'placed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELED = 'canceled',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});

@ObjectType()
export class Order {
  @Field()
  id: string;

  @Field(() => User)
  user: User;

  @Field(() => OrderStatus)
  status: OrderStatus;

  @Field()
  total: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
