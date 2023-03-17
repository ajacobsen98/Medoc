import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;
}
