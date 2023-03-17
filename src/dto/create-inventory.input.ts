import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateInventoryInput {
  @Field()
  productId: string;

  @Field()
  variantId: string;

  @Field()
  stock: number;
}
