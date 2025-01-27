import TransactionFilter from './TransactionFilter.vue'

describe('<TransactionFilter />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(TransactionFilter)
  })

  it('Check filters category', () => {
    cy.mount(TransactionFilter, {
      props: {
        categories: ['Food', 'Transportation'],
      },
    })
    cy.get("select").select(1).invoke("val").should("eq", "Food")
    cy.get("select").select(2).invoke("val").should("eq", "Transportation")
    cy.get("select").select(3).invoke("val").should("eq", "Bills")
  })

  it('Check filters end-date', () => {
    cy.mount(TransactionFilter, {
      props: {
        dates: ['2023-01-01', '2023-01-02'],
      },
    })
    cy.get('[data-test="date-filter-end"]').clear().type('2025-01-01')
    // .should("eq", '2025-01-01')
    // cy.get("select").select(2).invoke("val").should("eq", "2023-01-02")
    // cy.get("select").select(3).invoke("val").should("eq", "2023-01-03")
  })
})