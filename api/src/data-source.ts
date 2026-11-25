import { Post } from './posts/entities/post.entity';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import {SnakeNamingStrategy} from 'typeorm-naming-strategies';
import { User } from './users/entities/user.entity';

export default new DataSource({
  type: 'postgres',
  namingStrategy: new SnakeNamingStrategy(),

  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Post],
  migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
  synchronize: false,
});
