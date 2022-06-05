import {CardFranchiseEnum, CardTypeEnum} from "./card.model.entity";
import {TransactionStatusEnum} from "./transaction.entity";

export enum PaymentLocationEnum {
    BAQ = "BARRANQUILLA",
    STM = "SANTA MARTA",
    CTG = "CARTAGENA",
    SIN = "SINCELEJO",
    MON = "MONTERIA"
}

export interface Payment {
    id: number;
    name: string;
    email: string;
    ownerId: number;
    description: string;
    location: PaymentLocationEnum;
    total: number;
    bankId: number;
    cardId: number;
    franchise: CardFranchiseEnum;
    type: CardTypeEnum;
    creditLapses?: number;
    transactionStatus?: TransactionStatusEnum;
    createDate: Date;
    updateDate: Date;
    deleteDate: Date;
}
