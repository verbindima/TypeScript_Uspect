import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class Catalog extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @Column({ nullable: false })
  title: string

  @Column()
  description: string

  @Column()
  picture: string

  @Column({ nullable: false })
  type: string

  @Column({ nullable: false })
  price: number

  toJSON() {
    return { ...this, id: undefined }
  }
}
