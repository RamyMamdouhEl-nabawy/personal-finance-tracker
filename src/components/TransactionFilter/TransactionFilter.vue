<template>
  <div class="card">
    <div class="card-body">
      <div class="row my-4">
        <div class="form-group col-12 col-md-4">
          <label class="" for="transaction-category">Category:</label>
          <div class="col-12">
            <select
              name="transaction-category"
              id="transaction-category"
              class="form-control"
              v-model="selectedCategory"
            >
              <option value="">All</option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Bills">Bills</option>
              <option value="General">General</option>
            </select>
          </div>
        </div>

        <div class="col-12 col-md-8 row">
          <!-- <label for="dateRange">Date Range:</label> -->
          <div class="form-group col">
            <label for="start-date" class="col-form-label py-0">From:</label>
            <input
              id="start-date"
              data-test="date-filter-start"
              class="form-control"
              type="date"
              v-model="startDate"
            />
          </div>
          <div class="form-group col">
            <label for="end-date" class="col-form-label py-0">To:</label>
            <input
              id="end-date"
              data-test="date-filter-end"
              class="form-control"
              type="date"
              v-model="endDate"
            />
          </div>
        </div>
      </div>
      <div class="text-end">
        <button
          data-test="filter-button"
          class="btn btn-outline-success btn-lg"
          @click="applyFilter"
        >
          Filter
        </button>
      </div>
    </div>
  </div>
</template>
  
  <script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  data() {
    return {
      selectedCategory: "",
      startDate: "",
      endDate: "",
    };
  },
  setup() {
    const store = useStore();
    return { store };
  },
  methods: {
    // applyFilter(filters: any) {
    //   this.store.dispatch("filterTransactions", filters);
    // },
    applyFilter() {
      this.selectedCategory == "" && this.store.dispatch("loadTransactions");
      // Logic to filter transactions based on selected criteria
      // const filteredTransactions = this.store.state.transactions.filter(
      //   (transaction) => {
      //     const isCategoryMatch = this.selectedCategory
      //       ? transaction.category === this.selectedCategory
      //       : true;
      //     const isDateMatch =
      //       (!this.startDate || transaction.date >= this.startDate) &&
      //       (!this.endDate || transaction.date <= this.endDate);
      //     return isCategoryMatch && isDateMatch;
      //   }
      // );

      // Filtering transactions
      this.store.dispatch("filterTransactions", {
        type: this.selectedCategory,
        dateRange: {
          start: this.startDate,
          end: this.endDate,
        },
      });

      // Update the displayed transactions in the store or component state
      // this.store.commit("FILTER_TRANSACTIONS", filteredTransactions);
    },
  },
});
</script>

<style>
.card {
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 2px 2px 6px 4px rgba(0, 0, 0, 0.1);
}
.form-group {
  margin-bottom: 10px;
}
</style>