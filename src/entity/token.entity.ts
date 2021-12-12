import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, ManyToOne, JoinColumn } from 'typeorm';
import  { User }  from './user.entity';

@Entity()
export class Token extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    userId: number;

    @ManyToOne(type => User, {
        nullable: false
    })
    @JoinColumn({
        name: 'userId'
    })
    user: User;

    @Column({
        type: 'varchar',
        name: 'refresh_token'
    })
    refreshToken: string;

    @Column({
        type: 'timestamp',
        default: new Date()
    })
    created: Date;
}