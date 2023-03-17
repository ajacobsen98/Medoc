import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  password: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field()
  role: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
