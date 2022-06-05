import {GeneralRepository} from "./general.repository";
import {IPaymentRepository} from "../../../../application/ports/repositories/payment.repository";
import {PaymentCreateInput, PaymentUpdateInput} from "../../../../entities/schemas/types";
import {Payment} from "../../../../entities/models/payment.model.entity";
import {Connection, EntityManager, Repository} from "typeorm";
import {PaymentEntity} from "../entities/payment.entity";
import {paymentEntityToDomainPayment} from "./common/helpers/transform-data-to-domain";
import {TransactionStatusEnum} from "../../../../entities/models/transaction.entity";

export class PaymentRepository extends GeneralRepository implements IPaymentRepository {

    private paymentRepository: Repository<PaymentEntity>;

    constructor(connection: Connection) {
        super(connection);
        this.paymentRepository = connection.getRepository(PaymentEntity);
    }

    create(input: PaymentCreateInput): Promise<Payment>;
    create<T>(input: PaymentCreateInput, transactionManager: T): Promise<Payment>;
    async create(input: PaymentCreateInput, transactionManager?: EntityManager): Promise<Payment> {
        let payment = new PaymentEntity(input.name, input.email, input.ownerId, input.description, input.location, input.total, input.bankId, input.cardId, input.franchise, input.type, input.creditLapses !== undefined ? input.creditLapses : undefined);
        if (transactionManager) {
            await transactionManager.save(payment);
        } else {
            await this.paymentRepository.save(payment);
        }
        return paymentEntityToDomainPayment(payment);
    }

    async getAll(): Promise<Payment[]> {
        return await this.paymentRepository.find().then(pa => pa.map(el => paymentEntityToDomainPayment(el)));
    }

    async getById(id: number): Promise<Payment | undefined> {
        let pa = await this.paymentRepository.findOne(id);
        if (pa === undefined) return undefined;
        return paymentEntityToDomainPayment(pa);
    }

    update(id: number, input: PaymentUpdateInput): Promise<Payment | undefined>;
    update<T>(id: number, input: PaymentUpdateInput, transactionManager: T): Promise<Payment | undefined>;
    async update(id: number, input: PaymentUpdateInput, transactionManager?: EntityManager): Promise<Payment | undefined> {
        let pa = await this.paymentRepository.findOne(id);
        if (pa === undefined) return undefined;
        if (input.transactionStatus !== undefined) {
            pa.transactionStatus = <TransactionStatusEnum>input.transactionStatus;
        }
        if (input.completed !== undefined) pa.isCompleteAndApproved = input.completed;
        if (transactionManager) {
            await transactionManager.save(pa);
        } else {
            await this.paymentRepository.save(pa);
        }
        return paymentEntityToDomainPayment(pa);
    }

}
