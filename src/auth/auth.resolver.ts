// auth/auth.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginOutput }from './dto/login.output';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => LoginOutput)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<LoginOutput> {
    return await this.authService.validateUser(username, password);
  }
}
