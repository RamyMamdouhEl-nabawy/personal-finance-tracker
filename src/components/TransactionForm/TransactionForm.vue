<template>
  <form @submit.prevent="submitTransaction">
    <section class="row">
      <div class="col-6 col-md-2">
        <select
          name="transaction-type"
          data-test="transaction-type"
          class="form-control"
          v-model="type"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div class="col-6 col-md-2">
        <input
          name="transaction-amount"
          class="form-control"
          data-test="transaction-amount"
          type="number"
          v-model="amount"
          placeholder="Amount"
          required
        />
      </div>

      <div class="col-6 col-md-2">
        <select
          name="transaction-currency"
          class="form-control"
          v-model="currency"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="EGP">EGP</option>
          <option value="SAR">SAR</option>
          <option value="AED">AED</option>
        </select>
      </div>

      <div class="col-6 col-md-2">
        <select
          name="transaction-category"
          class="form-control"
          v-model="category"
          data-test="transaction-category"
        >
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Bills">Bills</option>
          <option value="General">General</option>
        </select>
      </div>

      <div class="col-6 col-md-2">
        <input
          class="form-control"
          name="transaction-date"
          type="date"
          v-model="date"
          required
        />
      </div>

      <div class="col-12 align-items-center justify-content-center text-end">
        <button
          class="btn btn-outline-success btn-lg mt-4"
          type="submit"
          data-test="submit-transaction"
        >
          Add Transaction
        </button>
      </div>
    </section>
  </form>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TransactionForm",
  data() {
    return {
      type: "income",
      amount: 0,
      currency: "USD",
      category: "Food",
      date: new Date().toISOString().split("T")[0],
    };
  },
  computed: {
    exchangeRate() {
      return this.currency === "USD"
        ? 1
        : this.store.state.exchangeRates["rate"];
    },
  },
  setup() {
    const store = useStore();
    return { store };
  },
  methods: {
    async submitTransaction() {
      await this.store.dispatch("fetchExchangeRates", this.currency);
      // Create a new transaction object
      const transaction = {
        id: Date.now(),
        type: this.type,
        amount: (this.amount * this.exchangeRate).toFixed(2),
        currency: this.currency,
        category: this.category,
        date: this.date,
      };
      this.store.dispatch("addTransaction", transaction);
      this.resetForm();
    },

    resetForm() {
      this.type = "income";
      this.amount = 0;
      this.currency = "USD";
      this.category = "Food";
      this.date = new Date().toISOString().split("T")[0];
    },
  },
});
</script>

<style>
.transaction-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  background-color: white;
}
</style>