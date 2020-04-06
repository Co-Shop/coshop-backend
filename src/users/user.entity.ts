import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Entity('user')
export class UserEntity {
    @PrimaryColumn('bigint')
    id: string;

    @Column({
        type: 'text',
        unique: true,
    })
    username: string;

    @Column('boolean')
    emailHidden: boolean;

    @Column({
        type: 'text',
        unique: true,
    })
    email: string;

    @Column('text', { nullable: true })
    password: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    toResponseObject(showToken = true) {
        const { id, username, email, created, updated } = this;

        const resObj: any = {
            id,
            username,
            created,
            updated,
        };

        if (showToken) {
            resObj.token = this.token;
        }

        if (!this.emailHidden) {
            resObj.email = email;
        }

        return resObj;
    }

    async validatePassword(pass: string) {
        return await bcrypt.compare(pass, this.password);
    }

    public get token() {
        const { id, username } = this;
        return jwt.sign(
            {
                id,
                username,
            },
            process.env.SECRET,
            {
                expiresIn: '7d',
            },
        );
    }
}
