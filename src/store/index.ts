import axios from 'axios';
// import { InjectionKey } from 'vue'
import type IExchangeRate from '@/interfaces/ExchangeRate';
import type { ITransaction } from '@/interfaces/Transaction';
import { createStore, useStore as baseUseStore } from 'vuex'

// export const key: InjectionKey<Store<RootState>> = Symbol()
export const key: any = Symbol()

export function useStore() {
  return baseUseStore(key)
}


export default createStore({
  state: {
    transactions: [] as ITransaction[],
    filteredTransactions: [] as ITransaction[],
    exchangeRates: {} as Record<string, number>,
    baseCurrency: 'USD',
  },
  mutations: {
    ADD_TRANSACTION(state: any, transaction: ITransaction) {
      state.transactions.push(transaction);
    },
    DELETE_TRANSACTION(state: any, id: number) {
      state.transactions = state.transactions.filter((t: ITransaction) => t.id !== id);
      localStorage.setItem('transactions', JSON.stringify(state.transactions));
    },
    EDIT_TRANSACTION(state: any, updatedTransaction: ITransaction) {
      const index = state.transactions.findIndex((t: ITransaction) => t.id === updatedTransaction.id);
      if (index !== -1) {
        state.transactions[index] = updatedTransaction;
      }
      // const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
      localStorage.setItem('transactions', JSON.stringify(state.transactions));
    },
    SET_EXCHANGE_RATES(state: any, rates: Record<string, number>) {
      state.exchangeRates = { ...state.exchangeRates, ...rates };
    },
    FILTER_TRANSACTIONS(state: any, transactions: ITransaction[]) {
      state.filteredTransactions = transactions;
    },
    SET_TRANSACTIONS(state: any, transactions: ITransaction[]) {
      state.transactions = transactions;
      localStorage.setItem('transactions', JSON.stringify(transactions));
    },
  },
  actions: {
    async fetchExchangeRates({ commit }: any, currency: string) {
      try {
        const response: IExchangeRate = await axios.get(`https://api.fastforex.io/convert?from=${currency}&to=USD&amount=1&api_key=demo`);
        const rate = response.data.result;
        // const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${currency}`);
        // const rate = response.data.rates.USD;
        commit('SET_EXCHANGE_RATES', rate);
        // commit('SET_EXCHANGE_RATES', { "rate": rate });
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    },
    loadTransactions({ commit }) {
      const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
      commit('SET_TRANSACTIONS', transactions);
    },
    addTransaction({ commit }, transaction: ITransaction) {
      commit('ADD_TRANSACTION', transaction);
      const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
      transactions.push(transaction);
      localStorage.setItem('transactions', JSON.stringify(transactions));
    },
    editTransaction: async ({ commit, dispatch, state }, updatedTransaction: ITransaction) => {
      if (updatedTransaction.currency == state.baseCurrency) {
        updatedTransaction.amount = Number(updatedTransaction.amount);
      } else {
        await dispatch('fetchExchangeRates', updatedTransaction.currency)
        const exchangeRate = state.exchangeRates["rate"];
        if (exchangeRate) updatedTransaction.amount = Number(Number(updatedTransaction.amount) * Number(state.exchangeRates["rate"]));
      }
      commit('EDIT_TRANSACTION', updatedTransaction);
    },
    filterTransactions({ commit, state }, filters: { type?: string; dateRange?: { start: string; end: string } }) {
      let filtered = [...state.transactions];

      if (filters.type) {
        filtered = filtered.filter(t => t.category === filters.type);
      }

      if (filters.dateRange?.start !== "") {
        filtered = filtered.filter(t => {
          const transactionDate = new Date(t.date).toISOString().split("T")[0];
          return transactionDate >= filters.dateRange!.start &&
            transactionDate <= filters.dateRange!.end;
        });
      }
      console.log(filtered);
      commit('FILTER_TRANSACTIONS', filtered);
    },
    truncateTransactionsList({ commit }) {
      commit('SET_TRANSACTIONS', []);
    }
  },
  getters: {
    totalIncome(state: any) {
      return state.transactions
        .filter((t: any) => t.type === 'income')
        .reduce((total: Number, t: any) => Number(total) + Number(t.amount), 0);
    },
    totalExpenses(state: any) {
      return state.transactions
        .filter((t: any) => t.type === 'expense')
        .reduce((total: Number, t: any) => Number(total) + Number(t.amount), 0);
    },
    netBalance(state: any, getters: any) {
      return getters.totalIncome - getters.totalExpenses;
    },
  },
});