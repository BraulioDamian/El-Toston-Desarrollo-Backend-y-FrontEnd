// src/entities/categoria.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Inventario } from './inventario.entity';

@Entity('categoria')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => Inventario, (inventario) => inventario.categoria)
  inventarios: Inventario[];
}
