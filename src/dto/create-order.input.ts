import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field()
  userId: string;

  @Field()
  status: string;

  @Field()
  total: number;
}
