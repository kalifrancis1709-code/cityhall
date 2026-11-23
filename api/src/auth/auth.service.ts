import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { createHash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private generatePayload(user: any) {
    return {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
  }

  private generateAccessToken(user: any) {
    const payload = this.generatePayload(user);

    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(user: any) {
    const payload = this.generatePayload(user);

    const secret = this.configService.getOrThrow<string>('JWT_REFRESH_SECRET');
    const expiresIn = this.configService.getOrThrow<string>(
      'JWT_REFRESH_EXPIRES_IN',
    ) as JwtSignOptions['expiresIn'];

    return this.jwtService.sign(payload, { secret, expiresIn });
  }

  private hashRefreshToken(refreshToken: string): string {
    return createHash('sha256').update(refreshToken).digest('hex');
  }
}
