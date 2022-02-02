import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { randomBytes } from 'crypto';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || randomBytes(128).toString('base64'),
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports: [AuthService],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
