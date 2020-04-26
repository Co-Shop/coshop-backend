import {
    Entity,
    Column,
    CreateDateColumn,
    ManyToOne,
    PrimaryColumn,
    OneToMany,
} from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { RequestEntity } from 'src/requests/request.entity';
import { ResponseEntity } from './../responses/response.entity';

@Entity('question')
export class QuestionEntity {
    @PrimaryColumn('bigint')
    id: string;

    @Column('text')
    question: string;

    @CreateDateColumn()
    created: Date;

    @ManyToOne(
        () => RequestEntity,
        r => r.questions,
    )
    request: RequestEntity;

    @ManyToOne(
        () => UserEntity,
        u => u.questions,
    )
    author: UserEntity;

    @OneToMany(
        () => ResponseEntity,
        r => r.question,
    )
    answers: ResponseEntity[];

}
