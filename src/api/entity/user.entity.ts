import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
} from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @Column()
  email: string

  @Column()
  password: string

  @Column({ default: false })
  isAdmin: boolean

  @Column()
  name: string

  @Column()
  surname: string

  @Column()
  city: string

  @Column()
  address: string

  @Column({ unique: true })
  @Unique(['phone'])
  phone: string

  @Column({ type: 'date' })
  birthday: Date

  toJSON() {
    return { ...this, id: undefined }
  }
}
