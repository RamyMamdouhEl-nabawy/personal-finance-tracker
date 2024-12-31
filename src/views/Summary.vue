<template>
  <div>
    <h2>Summary</h2>
    <section class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-4">
            <b>Total Income:</b>
            <span
              data-test="summary-income"
              class="badge badge-pill badge-light bg-secondary mx-2"
              >{{ totalIncome.toFixed(2) }} {{ baseCurrency }}</span
            >
          </div>
          <div class="col-4">
            <b>Total Expenses: </b>
            <span
              data-test="summary-expense"
              class="badge badge-pill badge-light bg-secondary mx-2"
              >{{ totalExpenses.toFixed(2) }} {{ baseCurrency }}</span
            >
          </div>
          <div class="col-4">
            <b>Net Balance:</b>
            <span
              data-test="summary-balance"
              class="badge badge-pill badge-light bg-secondary mx-2"
              >{{ netBalance.toFixed(2) }} {{ baseCurrency }}</span
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    return {
      totalIncome: store.getters.totalIncome,
      totalExpenses: store.getters.totalExpenses,
      netBalance: store.getters.netBalance,
      baseCurrency: store.state.baseCurrency,
    };
  },
  computed: {
    transactions() {
      return this.store.state.filteredTransactions.length > 0
        ? this.store.state.filteredTransactions
        : this.store.state.transactions;
    },
    totalIncome() {
      return this.store.getters.totalIncome;
    },
    totalExpenses() {
      return this.store.getters.totalExpenses;
    },
    balance() {
      return this.store.getters.netBalance;
    },
  },
});
</script>