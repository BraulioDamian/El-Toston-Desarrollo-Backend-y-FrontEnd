// src/entities/cliente.entity.ts (Actualizado)
// import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { Direccion } from './direccion.entity';
// import { Reserva } from './reserva.entity';
// 
// @Entity()
// export class Cliente {
//   @PrimaryGeneratedColumn()
//   id: number;
// 
//   @Column()
//   nombre: string;
// 
//   @Column({ unique: true })
//   telefono: string;
// 
//   @Column({ nullable: true })
//   correo: string;
// 
//   @Column({ default: false })
//   es_identificado: boolean;
// 
//   @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
//   fecha_registro: Date;
// 
//   @OneToMany(() => Direccion, (direccion) => direccion.cliente)
//   direcciones: Direccion[];
// 
//   @OneToMany(() => Reserva, (reserva) => reserva.cliente)
//   reservas: Reserva[];
// }
// 