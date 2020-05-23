import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";

@Entity('verification')
export class VerificationEntity {

    @PrimaryColumn('text')
    code: string;

    @Column('bigint')
    user: string;

    @Column('text')
    email: string;

    @CreateDateColumn()
    created: Date;

}