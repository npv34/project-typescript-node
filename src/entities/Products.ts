
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm"
import { Categories } from "./Categories"

@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name?: string



    @ManyToOne(() => Categories, (category) => category.products)
    @JoinColumn([
        { name: "category_id", referencedColumnName: "id" },
    ])
    category?: Categories
}
