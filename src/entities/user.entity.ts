import { hashSync } from "bcryptjs";
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeRemove } from "typeorm";
import { Contact } from "./contact.entity";

@Entity("users")
class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 50})
    name: string

    @Column({unique: true})
    email: string

    @Column({unique: true})
    cell_phone: string

    @Column()
    password: string

    @Column({nullable: true})
    profile_picture?: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
    
    @Column({default: true})
    is_active: boolean
    
    @DeleteDateColumn()
    deleted_at: Date

    @OneToMany(() => Contact, contact => contact.user)
    contacts: Contact[]

    @BeforeUpdate()
    @BeforeInsert()
    hasPassword(){
        this.password = hashSync(this.password, 10)
    }
}

export {User}