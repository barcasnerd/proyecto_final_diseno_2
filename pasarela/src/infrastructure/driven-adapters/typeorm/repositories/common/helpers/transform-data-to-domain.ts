import {BankEntity} from "../../../entities/bank.entity";
import {Bank} from "../../../../../../entities/models/bank.model.entity";

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
