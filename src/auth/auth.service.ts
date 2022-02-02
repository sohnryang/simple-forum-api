import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await argon2.verify(user.passwordHash, password)))
      return { id: user.id };
    return null;
  }

  async login(user: any) {
    return {
      token: this.jwtService.sign({ sub: user.id }),
    };
  }
}
