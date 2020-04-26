import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne,
} from 'typeorm';
import { QuestionEntity } from 'src/questions/question.entity';
import { UserEntity } from 'src/users/user.entity';
import { ShopEntity } from 'src/shops/shop.entity';

@Entity('response')
export class ResponseEntity {
    @PrimaryColumn('bigint')
    id: string;

    @Column('text')
    content: string;

    @ManyToOne(
        () => QuestionEntity,
        q => q.answers,
    )
    question: QuestionEntity;

    @ManyToOne(
        () => UserEntity,
        u => u.responses,
    )
    author: UserEntity;

    @ManyToOne(
        () => ShopEntity,
        s => s.responses,
        { cascade: true },
    )
    shop: ShopEntity;
}
