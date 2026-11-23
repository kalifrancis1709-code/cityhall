import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

export enum ActivityType {
  CREATION = 'creation',
  MODIFICATION = 'modification',
  SUPPRESSION = 'suppression',
  CONNEXION = 'connexion',
  DECONNEXION = 'deconnexion',
  AUTRE = 'autre',
}

@Entity('activities')
@Index(['user', 'dateCreation'])
export class Activity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  action!: string;

  @Column({
    type: 'enum',
    enum: ActivityType,
    default: ActivityType.AUTRE,
  })
  type!: ActivityType;

  @Column({ length: 100, nullable: true })
  module?: string | null;

  @Column({ type: 'jsonb', nullable: true })
  details?: Record<string, any> | null;

  @ManyToOne(() => User, (user) => user.activities, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  user?: User | null;

  @CreateDateColumn()
  dateCreation!: Date;
}
