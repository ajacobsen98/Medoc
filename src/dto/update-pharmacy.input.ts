import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdatePharmacyInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  userId?: string;
}
