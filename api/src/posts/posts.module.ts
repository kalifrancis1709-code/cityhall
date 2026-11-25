import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';
import { Zone } from '../zone/entities/zone.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Zone])],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
