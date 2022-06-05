import {Bank} from "./bank.model.entity";

export enum CardFranchiseEnum {
    VISA = "VISA",
    MASTERCARD = "MASTERCARD",
    AMERICAN = "AMERICAN EXPRESS"
}

export enum CardTypeEnum {
    CREDIT = "CREDIT",
    DEBIT = "DEBIT"
}

export interface Card {
    id: number;
    bank: Bank;
    ownerId: number;
    balance: number;
    franchise: CardFranchiseEnum,
    type: CardTypeEnum,
    active: boolean,
    createDate: Date;
    updateDate: Date;
    deleteDate: Date;
}
