import { Field, ObjectType } from '@nestjs/graphql';
import { Pharmacy } from './pharmacy.model';
import { ProductVariant } from './product-variant.model';

@ObjectType()
export class Inventory {
  @Field()
  id: string;

  @Field(() => ProductVariant)
  productVariant: ProductVariant;

  @Field(() => Pharmacy)
  pharmacy: Pharmacy;

  @Field()
  quantity: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
