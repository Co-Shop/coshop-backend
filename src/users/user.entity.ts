import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { RequestEntity } from 'src/requests/request.entity';
import { QuestionEntity } from 'src/questions/question.entity';
import { ResponseEntity } from './../responses/response.entity';
import { ProductEntity } from 'src/products/product.entity';

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

    @OneToMany(
        () => RequestEntity,
        r => r.author,
        { cascade: true },
    )
    requests: RequestEntity[];

    @OneToMany(
        () => QuestionEntity,
        q => q.author,
        { cascade: true },
    )
    questions: QuestionEntity[];

    @OneToMany(
        () => ResponseEntity,
        r => r.author,
        { cascade: true },
    )
    responses: ResponseEntity[];

    @OneToMany(
        () => ProductEntity,
        p => p.author,
        { cascade: true },
    )
    products: ProductEntity[];

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

        if (this.requests) resObj.requests = this.requests.map(r => r.id);
        if (this.questions) resObj.questions = this.questions.map(r => r.id);
        if (this.responses) resObj.responses = this.responses.map(r => r.id);
        if (this.products) resObj.products = this.products.map(r => r.id);

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
