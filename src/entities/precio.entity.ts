import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Check, Unique } from 'typeorm';
import { Producto} from './producto.entity';

@Entity('Precio')
@Unique(['producto', 'fecha_inicio', 'fecha_fin'])
@Check(`"fecha_inicio" < "fecha_fin"`)
export class Precio {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Producto, (producto) => producto.precio, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ type: 'date' })
  fecha_inicio: Date;

  @Column({ type: 'date' })
  fecha_fin: Date;


}
