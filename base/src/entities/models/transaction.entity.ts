import {Bank} from "./bank.model.entity";
import {Card} from "./card.model.entity";

export enum TransactionStatusEnum {
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

export interface Transaction {
    id: number;
    bank?: Bank;
    card?: Card;
    status: TransactionStatusEnum;
    reference?: number;
    total?: number;
    creditLapses?: number;
    pendingToSend?: boolean;
    reason?: string;
    createDate: Date;
    updateDate: Date;
    deleteDate: Date;
}
