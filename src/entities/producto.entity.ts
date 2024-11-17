// src/entities/producto.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Categoria } from './categoria.entity';
import { Precio } from './precio.entity';
import { Media } from './media.entity';

@Entity('Producto')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

  @Column({ type: 'int', unsigned: true, default: 0 })
  stock: number;

  // Relación inversa con Media
  @OneToMany(() => Media, (media) => media.producto)
  media: Media[];
  
  @OneToMany(() => Precio, (precio) => precio.producto, {
    eager: true,
    onDelete: 'CASCADE', // Asegura que al eliminar producto, se eliminen los Precio asociados
  })
  precio: Precio[];
  
}
