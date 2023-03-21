import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, UpdateDateColumn} from "typeorm";
import { User } from "./user.entity";

@Entity("contacts")
class Contact {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 50})
    name: string

    @Column({length: 30, nullable: true})
    description?: string

    @Column()
    email: string

    @Column()
    cell_phone: string

    @Column({nullable: true})
    profile_picture?: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(() => User, user => user.contacts)
    user: User
}

export {Contact}