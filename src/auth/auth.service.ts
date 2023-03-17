// auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/services/user.services';
import { JwtService } from '@nestjs/jwt';
import { LoginOutput } from './dto/login.output';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<LoginOutput> {
    const user = await this.userService.findUserByUsername(username);
    
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const payload = { username: user.username, sub: user.id, role: user.role };
        return {
          accessToken: this.jwtService.sign(payload),
        };
      }
    }
    
    return null;
  }
}
