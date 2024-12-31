<script setup lang="ts">
const msg =
  "Kindly note that exchange rates are converted to USD as a base currency, not real-time and are for demonstration purposes only.";
</script>

<template>
  <div class="container">
    <header class="my-3 row">
      <div class="col-2">
        <img
          alt="Finance Tracker Logo"
          class="logo"
          src="@/assets/logo.png"
          width="50"
          height="50"
        />
      </div>
      <div class="col-10 row">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/report">Report</RouterLink>
          <RouterLink to="/summary">Summary</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </header>
    <div class="alert alert-info" role="alert">
      {{ msg }}
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

nav {
  font-size: 12px;
  text-align: end;
}

nav a.router-link-exact-active {
  color: green; /*var(--color-text);*/
  text-decoration: underline;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  padding: 0 1rem;
  display: inline-block;
  text-decoration: none;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    width: 100%;
    display: flex;
    place-items: center;
  }

  nav {
    text-align: right;
    font-size: 1rem;
    align-self: center;

    padding: 1rem 0;
  }
}
</style>
