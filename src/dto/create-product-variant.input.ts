import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductVariantInput {
  @Field()
  productId: string;

  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  sku: string;
}
