// src/entities/usuario.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn
} from 'typeorm';
import { Rol } from './rol.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  correo: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_registro: Date;

  @ManyToOne(() => Rol, (rol) => rol.usuarios, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'rol_id' })  // Asegura que el nombre de columna sea "rol_id"
  rol: Rol;
}
