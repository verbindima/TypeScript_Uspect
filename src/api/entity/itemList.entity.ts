import {
  Entity,
  Column,
  JoinColumn,
  BaseEntity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Catalog } from './catalog.entity'
import { Order } from './order.entity'
@Entity()
export class ItemList extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @ManyToOne(() => Order, {
    nullable: true,
  })
  @JoinColumn({
    name: 'orderId',
  })
  order: Order

  @ManyToOne(() => Catalog, {
    nullable: true,
  })
  @JoinColumn({
    name: 'catalogId',
  })
  catalog: Catalog

  @Column()
  count: number
}
