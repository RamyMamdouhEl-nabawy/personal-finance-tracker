

<template>
  <div class="transaction-list__container container">
    <div class="row">
      <div class="col-12 col-lg-8 tarnsaction-list__list-grid">
        <section class="row justify-content-end transaction-list__actions">
          <div class="col-12 col-md-3 my-2">
            <button
              @click="truncateTransactionsList"
              class="btn btn-danger w-100"
            >
              Empty List
            </button>
          </div>
          <ExportCSV />
        </section>
        <TransactionList />
      </div>

      <section class="col-12 col-lg-4 transaction-list__chart">
        <FinancePieChart />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import ExportCSV from "../components/ExportCSV.vue";
import TransactionList from "../components/TransactionList.vue";
import FinancePieChart from "../components/FinancePieChart/FinancePieChart.vue";

components: {
  ExportCSV;
}
const store = useStore();
const truncateTransactionsList = () => {
  store.dispatch("truncateTransactionsList");
};
</script>

<style lang="css" scoped>
@media only screen and (max-width: 992px) {
  .tarnsaction-list__list-grid {
    order: 2;
  }
}
.transaction-list__actions {
  text-align: end;
  margin-bottom: 1rem;
}
</style>