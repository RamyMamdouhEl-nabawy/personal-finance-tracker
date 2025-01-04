<template>
  <div class="col-12 col-md-3 my-2">
    <button class="btn btn-dark w-100" @click="exportCSV">Export as CSV</button>
  </div>
</template>
  
  <script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    return {
      exportCSV() {
        const transactions =
          store.state.filteredTransactions.length > 0
            ? store.state.filteredTransactions
            : store.state.transactions;
        const csvContent =
          "data:text/csv;charset=utf-8,,Type,Category,Amount,Currency,Date\n" +
          transactions
            .map(
              (e: any) =>
                `,${e.type},${e.category},${e.amount},${e.currency},${e.date}`
            )
            .join("\n") +
          "\n" +
          `Total:,,,Income,Expense,NetBalance
          ,,,${store.getters.totalIncome.toFixed(
            2
          )},${store.getters.totalExpenses.toFixed(
            2
          )},${store.getters.netBalance.toFixed(2)}`;

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "transactions.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      store,
    };
  },
});
</script>