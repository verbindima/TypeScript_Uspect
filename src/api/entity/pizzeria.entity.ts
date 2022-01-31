import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class Pizzeria extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @Column({ nullable: false })
  title: string

  @Column({ nullable: false })
  city: string

  @Column({ nullable: false })
  address: string

  toJSON() {
    return { ...this, id: undefined }
  }
}
