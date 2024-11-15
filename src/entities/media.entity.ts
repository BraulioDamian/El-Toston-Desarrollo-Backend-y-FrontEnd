// src/entities/media.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Inventario } from './inventario.entity';

@Entity('media')
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  titulo: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ type: 'enum', enum: ['Imagen', 'Video'], default: 'Imagen' })
  tipo: 'Imagen' | 'Video';

  @Column()
  ruta: string; // Aquí la ruta será relativa

  @Column({ type: 'int', unsigned: true, default: 0 })
  orden: number;

  @ManyToOne(() => Inventario, (inventario) => inventario.media, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'inventario_id' })
  inventario: Inventario;
}
