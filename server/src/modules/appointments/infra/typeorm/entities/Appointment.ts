// ? Models ou Entidade, vai armazenar o formato de um dado que vai ser salvo no banco de dados
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' }) // qual coluna que vai identificar qual o prestador do agendamento
  provider: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' }) // qual coluna que vai identificar qual o prestador do agendamento
  user: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
