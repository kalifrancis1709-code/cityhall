import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Zone } from '../../zone/entities/zone.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column('text')
  content: string;

  @Column({ default: 'draft' })
  status: string;

  @CreateDateColumn()
  createdate: Date;

  @UpdateDateColumn()
  updatedate: Date;

  // Relation avec User
  @ManyToOne(() => User, (user) => user.posts, {
    nullable: false,
    onDelete: 'SET NULL',
  })
  user: User;

  // Relation avec Zone
  @ManyToOne(() => Zone, (zone) => zone.posts, {
    nullable: false,
    onDelete: 'SET NULL',
  })
  zone: Zone;
}
