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
