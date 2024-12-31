import TransactionForm from './TransactionForm.vue'

describe('<TransactionForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(TransactionForm)
    cy.get('[data-test="transaction-type"]').should('be.visible')
    cy.get('[data-test="transaction-category"]').should('be.visible')
    cy.get('[data-test="transaction-amount"]').should('be.visible')
    cy.get('select').should('be.visible')
    cy.get('[data-test="submit-transaction"]').should('be.visible')
  })
})