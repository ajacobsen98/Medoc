import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostType {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;
}
