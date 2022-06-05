import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {BankEntity} from "./bank.entity";
import {CardEntity} from "./card.entity";

@Entity()
export class TransactionEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => BankEntity, bank => bank.cards)
    bank?: BankEntity;

    @ManyToOne(() => CardEntity, card => card.transactions)
    card?: CardEntity;

    @Column({type: "varchar", nullable: false})
    status: string;

    @Column({type: "integer", nullable: true})
    reference?: number;

    @Column({type: "integer", nullable: true})
    total?: number;

    @Column({type: "integer", nullable: true})
    creditLapses?: number;

    @Column({type: "boolean", nullable: true})
    pendingToSend?: boolean;

    @Column({type: "varchar", nullable: true})
    reason?: string;

    @CreateDateColumn()
    createDate!: Date;

    @UpdateDateColumn()
    updateDate!: Date;

    @DeleteDateColumn()
    deleteDate!: Date;

    constructor(
        status: string, bank?: BankEntity, card?: CardEntity, reference?: number, total?: number, creditLapses?: number, pendingToSend?: boolean, reason?: string
    ) {
        this.status = status;
        this.bank = bank !== undefined ? bank : undefined;
        this.card = card !== undefined ? card : undefined;
        this.reference = reference !== undefined ? reference : undefined;
        this.total = total !== undefined ? total : undefined;
        this.creditLapses = creditLapses !== undefined ? creditLapses : undefined;
        this.pendingToSend = pendingToSend !== undefined ? pendingToSend : undefined;
        this.reason = reason !== undefined ? reason : undefined;
    }
}
