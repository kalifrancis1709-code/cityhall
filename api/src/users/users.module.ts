import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Zone } from '../zone/entities/zone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Zone])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
