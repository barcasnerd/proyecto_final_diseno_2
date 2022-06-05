export interface Bank {
    id: number;
    name: string;
    isBalanceServiceActive: boolean;
    isPaymentServiceActive: boolean;
    createDate: Date;
    updateDate: Date;
    deleteDate: Date;
}
