import { Field, ObjectType } from '@nestjs/graphql';
import { Pharmacy } from './pharmacy.model';

@ObjectType()
export class Product {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  category?: string;

  @Field()
  price: number;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field(() => Pharmacy)
  pharmacy: Pharmacy;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
