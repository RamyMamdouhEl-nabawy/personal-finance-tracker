export default interface IPlByMonth {
    id: number;
    type: 'income' | 'expense';
    category: 'Food' | 'Transportation' | 'Bills' | 'General' | 'All' | 'Other';
    currency?: string;
    amount: number;
    date: string;
}