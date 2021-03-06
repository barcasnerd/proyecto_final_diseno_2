import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {CardEntity} from "./card.entity";
import {TransactionEntity} from "./transaction.entity";

@Entity()
export class BankEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar", nullable: false})
    name: string;

    @Column({type: "boolean", nullable: false, default: true})
    isBalanceServiceActive!: boolean;

    @Column({type: "boolean", nullable: false, default: true})
    isPaymentServiceActive!: boolean;

    @OneToMany(() => CardEntity, card => card.bank)
    cards!: CardEntity[]

    @OneToMany(() => TransactionEntity, transaction => transaction.bank)
    transactions!: TransactionEntity[]

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
