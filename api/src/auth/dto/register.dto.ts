import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8, {
    message: 'There must be 8 characters in the password',
  })
  password!: string;
}
