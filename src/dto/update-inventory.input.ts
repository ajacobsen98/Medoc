import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateInventoryInput {
  @Field({ nullable: true })
  productId?: string;

  @Field({ nullable: true })
  variantId?: string;

  @Field({ nullable: true })
  stock?: number;
}
