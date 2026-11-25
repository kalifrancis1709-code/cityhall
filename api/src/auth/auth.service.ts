import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash } from 'crypto';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Session } from '../sessions/entities/session.entity';
import * as argon2 from 'argon2';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,

    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        password: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Identifiant incorrect');
    }

    const passwordValid = await argon2.verify(user.password, password);

    if (!passwordValid) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    const session = this.sessionRepository.create({
      token: this.hashRefreshToken(refreshToken),
      user,
    });

    await this.sessionRepository.save(session);

    return {
      message: 'Connexion reussi avec succès',
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    };
  }

  async me(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        dateCreation: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Utilisateur introuvable');
    }

    return user;
  }

  async changePassword(userId: number, dto: ChangePasswordDto) {
    const validPassword = await this.userRepository.findOne({
      where: { id: userId},
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
      },
    });

    if (!validPassword) {
      throw new UnauthorizedException('Non-exitent passworld');
    }

    const isValidPassword = await argon2.verify({dto.currentPassword, user.passWord});

    if (!isValidPassword){
      throw new UnauthorizedException ('This password is invalid')
    }

    const newPassword = await argon2.hash({newPassword, 10})
  }

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
