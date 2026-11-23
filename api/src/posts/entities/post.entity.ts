import {
Entity,
PrimaryGeneratedColumn,
Column,
CreateDateColumn,
UpdateDateColumn,
ManyToOne,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

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
createdAt: Date;

@UpdateDateColumn()
updatedAt: Date;

@ManyToOne(() => User, (user) => user.posts, {
    nullable: false,
    onDelete: 'CASCADE',
})
user: User;
}
