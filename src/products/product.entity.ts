import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    OneToMany,
    ManyToMany,
} from 'typeorm';
import { ShopEntity } from 'src/shops/shop.entity';
import { UserEntity } from 'src/users/user.entity';
import { RequestEntity } from 'src/requests/request.entity';

@Entity('product')
export class ProductEntity {
    @PrimaryColumn('bigint')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    producer: string;

    @CreateDateColumn()
    created: Date;

    @ManyToMany(
        () => ShopEntity,
        s => s.products,
        { nullable: true }
    )
    shops: ShopEntity[];

    @ManyToOne(
        () => UserEntity,
        u => u.products,
    )
    author: UserEntity;

    @OneToMany(
        () => RequestEntity,
        u => u.product,
    )
    requests: RequestEntity[];
}
