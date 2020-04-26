import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    ManyToOne,
} from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { QuestionEntity } from 'src/questions/question.entity';
import { ProductEntity } from 'src/products/product.entity';

@Entity('request')
export class RequestEntity {
    @PrimaryColumn('bigint')
    id: string;

    @Column('numeric')
    lat: number;

    @Column('numeric')
    lon: number;

    @ManyToOne(
        () => UserEntity,
        user => user.requests,
    )
    author: UserEntity;

    @Column('int')
    range: number;

    @ManyToOne(
        () => ProductEntity,
        p => p.requests,
        { cascade: true }
    )
    product: ProductEntity;

    @CreateDateColumn()
    created: Date;

    @Column('date', { nullable: true })
    expires: Date;

    @OneToMany(
        () => QuestionEntity,
        q => q.request,
        { cascade: true },
    )
    questions: QuestionEntity[];
}
