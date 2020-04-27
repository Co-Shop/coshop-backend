import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { ResponseEntity } from "src/responses/response.entity";
import { ProductEntity } from "src/products/product.entity";

@Entity('shop')
export class ShopEntity {

    @PrimaryColumn('bigint')
    id: string;

    @Column('text')
    name: string;

    @Column('numeric')
    lat: number;

    @Column('numeric')
    lon: number;

    @CreateDateColumn()
    created: Date;

    @OneToMany(
        () => ResponseEntity,
        res => res.shop,
    )
    responses: ResponseEntity[];

    @ManyToMany(
        () => ProductEntity,
        p => p.shops,
    )
    @JoinTable()
    products: ProductEntity[];

}