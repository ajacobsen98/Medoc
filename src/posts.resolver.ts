import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class PostsResolver {
  @Query(() => String)
  hello(): string {
    return 'Hello, World!';
  }
}
