import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Post } from '../../posts/entities/post.entity';
import { Zone } from '../../zone/entities/zone.entity';
import { Session } from '../../sessions/entities/session.entity';
import { Activity } from '../../activities/entities/activity.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  firstName!: string;

  @Column({ length: 100 })
  lastName!: string;

  @Column({ unique: true, length: 150 })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column({ default: 'cityhall_user' })
  role!: string;

  // Relation avec Post
  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];

  // Relation avec Session
  @OneToMany(() => Session, (session) => session.user)
  sessions!: Session[];

  // Relation avec Zone
  @ManyToOne(() => Zone, (zone) => zone.users, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  zone!: Zone | null;

  // Relation avec Activity
  @OneToMany(() => Activity, (activity) => activity.user)
  activities!: Activity[];

  @CreateDateColumn()
  dateCreation!: Date;

  @UpdateDateColumn()
  dateModification!: Date;
}
