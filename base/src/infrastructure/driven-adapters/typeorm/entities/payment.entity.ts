import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {CardFranchiseEnum, CardTypeEnum} from "../../../../entities/models/card.model.entity";
import {TransactionStatusEnum} from "../../../../entities/models/transaction.entity";
import {PaymentLocationEnum} from "../../../../entities/models/payment.model.entity";

@Entity()
export class PaymentEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar", nullable: false})
    name: string;

    @Column({type: "varchar", nullable: false})
    email: string;

    @Column({type: "integer", nullable: false})
    ownerId: number;

    @Column({type: "varchar", nullable: false})
    description: string;

    @Column({type: "varchar", nullable: false})
    location: string;

    @Column({type: "integer", nullable: false})
    total: number;

    @Column({type: "integer", nullable: false})
    bankId: number;

    @Column({type: "integer", nullable: false})
    cardId: number;

    @Column({type: "varchar", nullable: false})
    franchise: string;

    @Column({type: "varchar", nullable: false})
    type: string;

    @Column({type: "integer", nullable: true})
    creditLapses?: number;

    @Column({type: "varchar", nullable: true, default: `${TransactionStatusEnum.REJECTED}`})
    transactionStatus?: TransactionStatusEnum;

    @Column({type: "boolean", nullable: true, default: false})
    isCompleteAndApproved?: boolean

    @CreateDateColumn()
    createDate!: Date;

    @UpdateDateColumn()
    updateDate!: Date;

    @DeleteDateColumn()
    deleteDate!: Date;

    constructor(
        name: string, email: string, ownerId: number, description: string, location: string, total: number, bankId: number, cardId: number, franchise: string, type: string,
        creditLapse?: number
    ) {
        this.name = name;
        this.email = email;
        this.ownerId = ownerId;
        this.description = description;
        this.location = location;
        this.total = total;
        this.bankId = bankId;
        this.cardId = cardId;
        this.franchise = franchise;
        this.type = type;
        this.creditLapses = creditLapse !== undefined ? creditLapse : undefined;
    }

}
