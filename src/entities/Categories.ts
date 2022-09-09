
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm"
import {Products} from "./Products";

@Entity()
export class Categories {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name?: string

    @OneToMany(() => Products, (products) => products.category)
    products?: Products[]
}

