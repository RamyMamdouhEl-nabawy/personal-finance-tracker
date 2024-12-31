describe('Transaction Management', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should add a new transaction', () => {
        cy.addTransaction('expense', 50, 'Food')
        cy.get('[data-test="transaction-list"]').should('contain', 'Food')
        cy.get('[data-test="transaction-list"]').should('contain', '50')
    })
    it('should delete a transaction', () => {
        cy.addTransaction('income', 100, 'Food')
        cy.get('[data-test="transaction-list"]').should('contain', 'Food')
        cy.get('[data-test="transaction-list"]').should('contain', '100')
    })
    it('should edit a transaction', () => {
        cy.addTransaction('income', 100, 'Food')
        cy.get('[data-test="transaction-list"]').should('contain', 'Food')
        cy.get('[data-test="transaction-list"]').should('contain', '100')
    })

    it('should filter transactions by category', () => {
        cy.addTransaction('expense', 50, 'Food')
        cy.addTransaction('income', 100, 'Food')
        cy.get('[data-test="transaction-list"]').should('contain', 'Food')
        cy.get('[data-test="transaction-list"]').should('contain', '50')
        cy.get('[data-test="transaction-list"]').should('contain', '100')
    })

    it('should filter transactions by date', () => {
        cy.addTransaction('expense', 50, 'Food')
        cy.addTransaction('income', 100, 'Food')
        cy.get('[data-test="transaction-list"]').should('contain', 'Food')
        cy.get('[data-test="transaction-list"]').should('contain', '50')
        cy.get('[data-test="transaction-list"]').should('contain', '100')
    })
})  // end of describe block

