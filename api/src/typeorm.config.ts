import 'dotenv/config';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource } from 'typeorm';

import { Post } from './posts/entities/post.entity';
import { User } from './users/entities/user.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  entities: [User, Post],

  migrations: ['dist/migrations/*.js'],

  namingStrategy: new SnakeNamingStrategy(),

  synchronize: false,
  logging: true,
});
