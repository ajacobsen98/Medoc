import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateProductVariantInput {
  @Field({ nullable: true })
  productId?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  sku?: string;
}
