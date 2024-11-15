// src/entities/inventario.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Categoria } from './categoria.entity';
import { Precio } from './precio.entity';
import { Media } from './media.entity';

@Entity('inventario')
export class Inventario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.inventarios, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

  @Column({ type: 'int', unsigned: true, default: 0 })
  stock: number;

  @OneToMany(() => Precio, (precio) => precio.inventario, { cascade: true })
  precios: Precio[];

  @OneToMany(() => Media, (media) => media.inventario, { cascade: true })
  media: Media[];
}
