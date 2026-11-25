import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @Get('me')
  async me(@Req() req: any) {
    return this.authService.me(req.user.sub);
  }

  @Patch('ChangePassword')
  async changePassword(@Req req: Request, @Body() dto: ChangePasswordDto) {
    return this.authService.changePassword(dto.newPassword);
  }
}
