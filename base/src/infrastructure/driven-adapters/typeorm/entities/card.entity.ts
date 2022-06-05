import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Bank} from "../../../../entities/models/bank.model.entity";
import {CardFranchiseEnum, CardTypeEnum} from "../../../../entities/models/card.model.entity";
import {BankEntity} from "./bank.entity";
import {TransactionEntity} from "./transaction.entity";


@Entity()
export class CardEntity {

    @PrimaryGeneratedColumn()
    id!: number;


    @ManyToOne(() => BankEntity, bank => bank.cards)
    bank: BankEntity;

    @Column({type: "integer", nullable: false})
    ownerId: number;

    @Column({type: "integer", nullable: false, default: 0})
    balance: number;

    @Column({type: "varchar", nullable: false})
    franchise: string;

    @Column({type: "varchar", nullable: false})
    type: string;

    @Column({type: "boolean", nullable: false, default: true})
    active!: boolean;

    @OneToMany(() => TransactionEntity, transaction => transaction.card)
    transactions!: TransactionEntity[]

    @CreateDateColumn()
    createDate!: Date;

    @UpdateDateColumn()
    updateDate!: Date;

    @DeleteDateColumn()
    deleteDate!: Date;

    constructor(ownerId: number, balance: number, franchise: string, type: string, bank: BankEntity) {
        this.ownerId = ownerId;
        this.balance = balance;
        this.franchise = franchise;
        this.type = type;
        this.bank = bank;
    }
}
