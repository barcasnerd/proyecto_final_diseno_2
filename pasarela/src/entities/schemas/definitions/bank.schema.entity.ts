import Joi from "joi";

export const BankCreateInputSchema = Joi.object({
    name: Joi.string().min(1).required().description("bank name")
}).meta({
    className: "BankCreateInput"
});

export const BankUpdateInputSchema = Joi.object({
    name: Joi.string().min(1).description("bank name")
}).meta({
    className: "BankUpdateInput"
});
