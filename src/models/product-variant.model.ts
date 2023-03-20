import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from './product.model';

@ObjectType()
export class ProductVariant {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  sku: string;

  @Field()
  price: number;

  @Field(() => Product)
  product: Product;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
