<template>
  <div>
    <h2>Transaction List</h2>
    <transaction-filter />

    <div class="table-responsive">
      <table class="table table-hover my-4" data-test="transaction-list">
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Category</th>
            <th scope="col">Amount</th>
            <th scope="col">Curreny</th>
            <th scope="col">Total</th>
            <th colspan="2" scope="col">Date</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction.id">
            <th scope="row">{{ transaction.type }}</th>
            <td scope="row">{{ transaction.category }}</td>
            <td>{{ (+transaction.amount).toFixed(2) }}</td>
            <td>{{ transaction.currency }}</td>
            <td>
              <span class="badge badge-pill badge-info">
                {{ (+transaction.total).toFixed(2) }}$
              </span>
            </td>
            <td colspan="2">{{ transaction.date }}</td>
            <td>
              <button class="btn btn-light" @click="openEditModal(transaction)">
                Edit
              </button>
            </td>
            <td>
              <button
                class="btn btn-danger"
                @click="deleteTransaction(transaction.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Transaction Modal -->
    <div v-if="isEditModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeEditModal">&times;</span>
        <h2>Edit Transaction</h2>
        <form @submit.prevent="submitEditTransaction">
          <section class="row">
            <div class="col-6 col-md-2">
              <select
                name="transaction-type"
                data-test="transaction-type"
                class="form-control"
                v-model="editTransaction.type"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div class="col-6 col-md-2">
              <input
                name="transaction-amount"
                type="number"
                step=".001"
                v-model="editTransaction.amount"
                placeholder="Amount"
                required
                class="form-control"
              />
            </div>

            <div class="col-6 col-md-2">
              <select
                name="transaction-currency"
                class="form-control"
                v-model="editTransaction.currency"
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
                v-model="editTransaction.category"
              >
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Bills">Bills</option>
                <option value="General">General</option>
              </select>
            </div>

            <div class="col-6 col-md-2">
              <input
                name="transaction-date"
                class="form-control"
                type="date"
                v-model="editTransaction.date"
                required
              />
            </div>

            <div
              class="col-12 align-items-center justify-content-center text-end"
            >
              <button class="btn btn-outline-success btn-lg mt-4" type="submit">
                Update Transaction
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import { ITransaction } from "../interfaces/Transaction";
import TransactionFilter from "./TransactionFilter/TransactionFilter.vue";

export default defineComponent({
  components: { TransactionFilter },
  computed: {
    totalIncome(): any {
      return this.store.getters.totalIncome;
    },
    totalExpenses(): any {
      return this.store.getters.totalExpenses;
    },
    balance(): any {
      return this.store.getters.netBalance;
    },
  },
  setup() {
    const store = useStore();
    const isEditModalOpen = ref(false);
    const editTransaction = ref<any>(null);

    let transactionsList = computed(() => {
      return store.state.filteredTransactions.length > 0
        ? store.state.filteredTransactions
        : store.state.transactions;
    });
    const transactions = computed(() => transactionsList.value);

    const deleteTransaction = (id: number) => {
      store.commit("DELETE_TRANSACTION", id);
    };

    const openEditModal = (transaction: any) => {
      editTransaction.value = { ...transaction }; // Create a copy of the transaction
      isEditModalOpen.value = true;
    };

    const closeEditModal = () => {
      isEditModalOpen.value = false;
      editTransaction.value = null; // Reset the edit transaction
    };

    const submitEditTransaction = () => {
      if (editTransaction.value) {
        store.dispatch("editTransaction", editTransaction.value);
        closeEditModal();
      }
    };

    return {
      transactions,
      deleteTransaction,
      openEditModal,
      closeEditModal,
      submitEditTransaction,
      isEditModalOpen,
      editTransaction,
      store,
    };
  },
  mounted() {
    this.transactionsList = this.$store.state.transactions;
    this.$store.dispatch("loadTransactions");
  },
});
</script>

<style scoped>
h2,
li {
  color: hsla(160, 100%, 37%, 1);
}
table {
  text-align: center;
}
tr {
  vertical-align: middle;
}
th {
  font-weight: bold;
}
.badge-info {
  color: #fff;
  background-color: #17a2b8;
}
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>