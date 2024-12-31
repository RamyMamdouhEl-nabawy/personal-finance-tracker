<script setup lang="ts">
import TransactionForm from "../components/TransactionForm/TransactionForm.vue";
import TransactionList from "../components/TransactionList.vue";
</script>

<template>
  <main class="row">
    <section class="col-12">
      <TransactionForm class="my-4" />
      <TransactionList />
    </section>
  </main>
</template>
