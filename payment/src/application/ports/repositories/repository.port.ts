export interface IRepository {
    transaction(transaction: <T>(manager: T) => Promise<void>): Promise<void>;
}
