import Joi from "joi";
import {CardFranchiseEnum, CardTypeEnum} from "../../models/card.model.entity";
import {TransactionStatusEnum} from "../../models/transaction.entity";
import {PaymentLocationEnum} from "../../models/payment.model.entity";

export const BankCreateInputSchema = Joi.object({
    name: Joi.string().min(1).required().description("bank name"),
}).meta({
    className: "BankCreateInput"
});

export const BankUpdateInputSchema = Joi.object({
    name: Joi.string().min(1).description("bank name"),
    isBalanceServiceActive: Joi.boolean().description("bank balance service status"),
    isPaymentServiceActive: Joi.boolean().description("bank payment service status")
}).meta({
    className: "BankUpdateInput"
});


export const CardCreateInputSchema = Joi.object({
    bankId: Joi.number().required().positive().min(1),
    ownerId: Joi.number().required().min(1).positive(),
    balance: Joi.number().required().min(0),
    franchise: Joi.string().valid(...Object.values(CardFranchiseEnum)).required(),
    type: Joi.string().valid(...Object.values(CardTypeEnum)).required(),
}).meta({
    className: "CardCreateInput"
});

export const CardUpdateInputSchema = Joi.object({
    balance: Joi.number().min(0),
    active: Joi.boolean()
}).meta({
    className: "CardUpdateInput"
});


export const TransactionCreateInputSchema = Joi.object({
    bankId: Joi.number().required().positive().min(1),
    cardId: Joi.number().required().positive().min(1),
    ownerId: Joi.number().required().min(1).positive(),
    total: Joi.number().required().min(1),
    franchise: Joi.string().valid(...Object.values(CardFranchiseEnum)).required(),
    type: Joi.string().valid(...Object.values(CardTypeEnum)).required(),
    creditLapses: Joi.number().positive().min(1),
    reference: Joi.number().required().positive().min(1),
}).meta({
    className: "TransactionCreateInput"
});

export const TransactionFailedCreateInputSchema = Joi.object({
    status: Joi.string().valid(...Object.values(TransactionStatusEnum)).required(),
    reason: Joi.string().required()
}).meta({
    className: "TransactionFailedCreateInput"
});

export const TransactionUpdateInputSchema = Joi.object({
    pendingToSend: Joi.boolean(),
}).meta({
    className: "TransactionUpdateInput"
});


export const PaymentCreateInputSchema = Joi.object({
    name: Joi.string().min(1).description("owner name").required(),
    email: Joi.string().min(1).description("owner email").required(),
    ownerId: Joi.number().required().min(1).positive(),
    description: Joi.string().min(1).description("payment concept").required(),
    location: Joi.string().valid(...Object.values(PaymentLocationEnum)).required(),
    total: Joi.number().required().min(1),
    bankId: Joi.number().required().positive().min(1),
    cardId: Joi.number().required().positive().min(1),
    franchise: Joi.string().valid(...Object.values(CardFranchiseEnum)).required(),
    type: Joi.string().valid(...Object.values(CardTypeEnum)).required(),
    creditLapses: Joi.number().positive().min(1),
}).meta({
    className: "PaymentCreateInput"
})

export const PaymentUpdateInputSchema = Joi.object({
    transactionStatus: Joi.string().valid(...Object.values(TransactionStatusEnum)),
    completed: Joi.boolean()
}).meta({
    className: "PaymentUpdateInput"
})
