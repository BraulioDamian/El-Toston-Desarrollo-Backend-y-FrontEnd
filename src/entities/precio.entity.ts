import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Inventario } from './inventario.entity';

@Entity('precio')
export class Precio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ type: 'date' })
  fecha_inicio: Date;

  @Column({ type: 'date', nullable: true })
  fecha_fin: Date | null;

  @ManyToOne(() => Inventario, (inventario) => inventario.precios, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'mueble_id' })
  inventario: Inventario;
}
