import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique} from "typeorm";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id!: number;

    @Column()
    name!: string;
    
    @Column()
    surname!: string;

    @Column()
    city!: string;

    @Column()
    address!: string;

    @Column()
    @Unique(['phone'])
    phone!: string;

    @Column({type: 'date'})
    birthday!: string;

}
