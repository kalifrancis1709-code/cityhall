
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Post } from '../../posts/entities/post.entity';
import { User } from '../../users/entities/user.entity';

@Entity('zones')
export class Zone {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string | null;

  @Column({
    length: 100,
    nullable: true,
  })
  localization?: string | null;

  @Column({ default: true })
  estActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Une zone peut contenir plusieurs publications
  @OneToMany(() => Post, (post) => post.zone)
  posts!: Post[];

  // Une zone peut contenir plusieurs utilisateurs
  @OneToMany(() => User, (user) => user.zone)
  users!: User[];
}
