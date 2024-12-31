<script setup lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

defineComponent({
  name: "NotFound",
});
</script>

<template>
  <main class="not-found">
    <img
      class="not-found__image"
      src="../components/icons/404.webp"
      alt="not-found"
    />
    <p class="not-found__message">PAGE NOT FOUND</p>
    <router-link class="not-found__redirection-link" to="/"
      >Go to Home</router-link
    >
  </main>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 75vh;
}
.not-found__message {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #be4e9d;
}
.not-found__redirection-link {
  text-decoration: none;
  color: #be4e9d;
  font-size: 1.2rem;
  font-weight: bold;
}
.not-found__redirection-link:hover {
  padding: .75rem;
  border-radius: 10px;
  background-color: rgba(208, 208, 208, 0.3);
}
</style>
