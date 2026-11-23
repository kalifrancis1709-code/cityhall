
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

@Entity('sessions')
@Index(['user', 'isActive'])
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // Empreinte du token, jamais le token brut
  @Column({ unique: true, select: false })
  tokenHash!: string;

  // Adresse IP de connexion
  @Column({ length: 45, nullable: true })
  ipAddress?: string | null;

  // Informations sur le navigateur ou appareil
  @Column({ type: 'text', nullable: true })
  userAgent?: string | null;

  // État de la session
  @Column({ default: true })
  isActive!: boolean;

  // Date d'expiration
  @Column({ type: 'timestamptz' })
  expiresAt!: Date;

  // Dernière activité
  @Column({ type: 'timestamptz', nullable: true })
  lastActivityAt?: Date | null;

  // Utilisateur propriétaire de la session
  @ManyToOne(() => User, (user) => user.sessions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
