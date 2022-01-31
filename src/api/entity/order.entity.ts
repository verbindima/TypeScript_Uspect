import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from './user.entity'
import { Pizzeria } from './pizzeria.entity'
@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @ManyToOne(() => User, {
    nullable: true,
  })
  @JoinColumn({
    name: 'userId',
  })
  user: User

  @ManyToOne(() => Pizzeria, {
    nullable: true,
  })
  @JoinColumn({
    name: 'pizzeriaId',
  })
  pizzeria: Pizzeria

  @Column({ default: 0 })
  summ: number

  @Column({ default: 0 })
  discount: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  toJSON() {
    return { ...this, id: undefined }
  }
}
