import {BankEntity} from "../../../entities/bank.entity";
import {Bank} from "../../../../../../entities/models/bank.model.entity";
import {CardEntity} from "../../../entities/card.entity";
import {Card, CardFranchiseEnum, CardTypeEnum} from "../../../../../../entities/models/card.model.entity";
import {TransactionEntity} from "../../../entities/transaction.entity";
import {Transaction, TransactionStatusEnum} from "../../../../../../entities/models/transaction.entity";
import {PaymentEntity} from "../../../entities/payment.entity";
import {Payment, PaymentLocationEnum} from "../../../../../../entities/models/payment.model.entity";

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

export function transactionEntityToDomainTransaction(transactionEntity: TransactionEntity): Transaction {
    return {
        id: transactionEntity.id,
        bank: transactionEntity.bank ? bankEntityToDomainBank(transactionEntity.bank) : undefined,
        card: transactionEntity.card ? cardEntityToDomainCard(transactionEntity.card) : undefined,
        status: <TransactionStatusEnum>transactionEntity.status,
        reference: transactionEntity.reference !== undefined ? transactionEntity.reference : undefined,
        total: transactionEntity.total !== undefined ? transactionEntity.total : undefined,
        creditLapses: transactionEntity.creditLapses !== undefined ? transactionEntity.creditLapses : undefined,
        pendingToSend: transactionEntity.pendingToSend !== undefined ? transactionEntity.pendingToSend : undefined,
        reason: transactionEntity.reason !== undefined ? transactionEntity.reason : undefined,
        createDate: transactionEntity.createDate,
        updateDate: transactionEntity.updateDate,
        deleteDate: transactionEntity.deleteDate
    }
}

export function paymentEntityToDomainPayment(paymentEntity: PaymentEntity): Payment {
    return {
        id: paymentEntity.id,
        transactionStatus: paymentEntity.transactionStatus !== undefined ? paymentEntity.transactionStatus : undefined,
        bankId: paymentEntity.bankId,
        cardId: paymentEntity.cardId,
        creditLapses: paymentEntity.creditLapses !== undefined ? paymentEntity.creditLapses : undefined,
        description: paymentEntity.description,
        email: paymentEntity.email,
        franchise: <CardFranchiseEnum>paymentEntity.franchise,
        location: <PaymentLocationEnum>paymentEntity.location,
        name: paymentEntity.name,
        ownerId: paymentEntity.ownerId,
        total: paymentEntity.total,
        type: <CardTypeEnum>paymentEntity.type,
        isCompleteAndApproved: paymentEntity.isCompleteAndApproved !== undefined ? paymentEntity.isCompleteAndApproved : undefined,
        updateDate: paymentEntity.updateDate,
        createDate: paymentEntity.createDate,
        deleteDate: paymentEntity.deleteDate,
    }
}
