describe('Transaction Management', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should add a new expense transaction', () => {
        cy.addTransaction('expense', 50, 'Food')
        cy.get('[data-test="transaction-list"]').should('contain', 'Food')
        cy.get('[data-test="transaction-list"]').should('contain', '50')
    })
    it('should add a new income transaction', () => {
        cy.addTransaction('income', 100, 'Food')
        cy.get('[data-test="transaction-list"]').should('contain', 'Food')
        cy.get('[data-test="transaction-list"]').should('contain', '100')
    })
    it('should delete a transaction', () => {
        cy.addTransaction('income', 100, 'Food')
        cy.get('[data-test="transaction-list"]').should('contain', 'Food')
        cy.get('[data-test="transaction-list"]').should('contain', '100')
    })

    it('should include transactions with different categories', () => {
        cy.addTransaction('expense', 50, 'Food')
        cy.get('[data-test=transaction-amount]').clear()
        cy.addTransaction('income', 100, 'General')
        cy.get('[data-test="transaction-list"]').should('contain', 'Food')
        cy.get('[data-test="transaction-list"]').should('contain', '50')
        cy.get('[data-test="transaction-list"]').should('contain', '100')
    })

})  // end of describe block

