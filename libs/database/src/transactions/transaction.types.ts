export type TransactionCallback<T, TTransaction> = (
  tx: TTransaction,
) => Promise<T>;
