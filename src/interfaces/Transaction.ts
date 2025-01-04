export interface RootState {
    transactions: ITransaction[];
    filteredTransactions: ITransaction[];
    exchangeRates: Record<string, number>;
}

export interface ITransaction {
    id: number;
    type: 'income' | 'expense';
    amount: number;
    currency: string;
    category: string;
    date: string;
}