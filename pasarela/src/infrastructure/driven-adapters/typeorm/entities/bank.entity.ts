import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
export class BankEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar", nullable: false})
    name: string;

    @CreateDateColumn()
    createDate!: Date;

    @UpdateDateColumn()
    updateDate!: Date;

    @DeleteDateColumn()
    deleteDate!: Date;

    constructor(name: string) {
        this.name = name;
    }
}
