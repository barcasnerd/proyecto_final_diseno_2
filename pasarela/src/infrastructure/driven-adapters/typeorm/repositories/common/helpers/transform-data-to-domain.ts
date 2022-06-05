import {BankEntity} from "../../../entities/bank.entity";
import {Bank} from "../../../../../../entities/models/bank.model.entity";
import {CardEntity} from "../../../entities/card.entity";
import {Card, CardFranchiseEnum, CardTypeEnum} from "../../../../../../entities/models/card.model.entity";

export function bankEntityToDomainBank(bankEntity: BankEntity): Bank {
    return {
        id: bankEntity.id,
        name: bankEntity.name,
        isBalanceServiceActive: bankEntity.isBalanceServiceActive,
        isPaymentServiceActive: bankEntity.isPaymentServiceActive,
        createDate: bankEntity.createDate,
        updateDate: bankEntity.updateDate,
        deleteDate: bankEntity.deleteDate,
    }
}

export function cardEntityToDomainCard(cardEntity: CardEntity): Card {
    return {
        id: cardEntity.id,
        bank: cardEntity.bank,
        ownerId: cardEntity.ownerId,
        balance: cardEntity.balance,
        franchise: <CardFranchiseEnum>cardEntity.franchise,
        type: <CardTypeEnum>cardEntity.type,
        active: cardEntity.active,
        createDate: cardEntity.createDate,
        updateDate: cardEntity.updateDate,
        deleteDate: cardEntity.deleteDate

    }
}
