import TransactionFilter from './TransactionFilter.vue'

describe('<TransactionFilter />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(TransactionFilter)
  })
})