# personal-finance-tracker

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

### 1- Create a folder in your machine for holding application:

- mkdir [personal-finance-tracker]

### 2- Clone repository from GitHub:

- $git clone https://github.com/RamyMamdouhEl-nabawy/

### 3- Get into project folder:

- cd [personal-finance-tracker]

### 4- Install dependencies

```sh
npm install
```

### 5- Compile and Hot-Reload for Development

```sh
npm run dev
```

## Application should start over domain http://localhost:5173/

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [cypress](https://www.cypress.io/)

#### Testing app should start over domain http://localhost:4173/

- [kindly note that some tests might not work without running development server first for routes naviation]

```sh
npm run test:e2e
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

# Project Pages

### Home Page
`A view of the home page with a list of transactions and a form to add new transactions.`

### Report Page
`A view of the report page with a list of transactions and a form to filter transactions.`
`The report page is filtered by date and transaction type.`
`The report page includes a pie chart to visualize the transaction types.`
`The report page includes a excel file download button to download the report as an excel file.`

### Summary Page
`A view of the summary page with a summary of total type of transactions with remaining balance.`

### About Page
`A view of the about page with information about the project and the team.`

# Used Technologies:
- Vue 3 for building the UI
- Vite for building and bundling
- Vuex for state management
- Axios for API calls
- Vue Router for routing
- Cypress for testing
- bootstrap for styling