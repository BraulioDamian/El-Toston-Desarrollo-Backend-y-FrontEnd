// src/entities/media.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Producto } from './producto.entity';
import { MediaType } from '../enums/media-type.enum'; // Enum separado

@Entity('Media')
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  titulo?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descripcion?: string;

  @Column({
    type: 'enum',
    enum: MediaType, // Usa el enum reutilizable
    default: MediaType.IMAGEN,
  })
  tipo: MediaType;

  @Column({ type: 'varchar', length: 255 })
  ruta: string;

  @Column({ type: 'int', unsigned: true, default: 0 })
  orden: number;

  // Relación con Producto
  @ManyToOne(() => Producto, (producto) => producto.media, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'producto_id' }) // Nombre de la clave foránea
  producto: Producto;
}
