import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateOrderInput {
  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  total?: number;
}
