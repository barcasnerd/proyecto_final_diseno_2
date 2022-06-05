/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface BankCreateInput {
  /**
   * bank name
   */
  name: string;
}

export interface BankUpdateInput {
  /**
   * bank balance service status
   */
  isBalanceServiceActive?: boolean;
  /**
   * bank payment service status
   */
  isPaymentServiceActive?: boolean;
  /**
   * bank name
   */
  name?: string;
}

export interface CardCreateInput {
  balance: number;
  bankId: number;
  franchise: 'VISA' | 'MASTERCARD' | 'AMERICAN EXPRESS';
  ownerId: number;
  type: 'CREDIT' | 'DEBIT';
}

export interface CardUpdateInput {
  active?: boolean;
  balance?: number;
}

export interface PaymentCreateInput {
  bankId: number;
  cardId: number;
  creditLapses?: number;
  /**
   * payment concept
   */
  description: string;
  /**
   * owner email
   */
  email: string;
  franchise: 'VISA' | 'MASTERCARD' | 'AMERICAN EXPRESS';
  location: 'BARRANQUILLA' | 'SANTA MARTA' | 'CARTAGENA' | 'SINCELEJO' | 'MONTERIA';
  /**
   * owner name
   */
  name: string;
  ownerId: number;
  total: number;
  type: 'CREDIT' | 'DEBIT';
}

export interface PaymentUpdateInput {
  completed?: boolean;
  transactionStatus?: 'APPROVED' | 'REJECTED';
}

export interface TransactionCreateInput {
  bankId: number;
  cardId: number;
  creditLapses?: number;
  franchise: 'VISA' | 'MASTERCARD' | 'AMERICAN EXPRESS';
  ownerId: number;
  reference: number;
  total: number;
  type: 'CREDIT' | 'DEBIT';
}

export interface TransactionFailedCreateInput {
  reason: string;
  status: 'APPROVED' | 'REJECTED';
}

export interface TransactionUpdateInput {
  pendingToSend?: boolean;
}
