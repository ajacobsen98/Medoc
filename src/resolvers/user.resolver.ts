import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from '../services/user.services';
import { User } from '../models/user.model';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  
  @UseGuards(GqlAuthGuard)
  @Query(() => User, { nullable: true })
  async user(@Args('id') id: string): Promise<User | null> {
    return this.userService.getUserById(id);
  }
  
  @Mutation(() => User)
  async createUser(@Args('input') input: User): Promise<User> {
    return this.userService.createUser(input);
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(@Args('id') id: string, @Args('input') input: UpdateUserInput): Promise<User | null> {
    return this.userService.updateUser(id, input);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    return this.userService.deleteUser(id);
  }
}
