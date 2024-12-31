describe('Summary', () => {
    beforeEach(() => {
        cy.visit('/summary')
    })
    it('should display summary income', () => {
        cy.get('[data-test="summary-income"]').should('be.visible')
        cy.get('[data-test="summary-income"]').should('contain', '0')
    })

    it('should display summary expenses', () => {

        cy.get('[data-test="summary-expense"]').should('be.visible')
        cy.get('[data-test="summary-expense"]').should('contain', '0')
    })

    it('should display summary balance in USD format', () => {
        cy.get('[data-test="summary-balance"]').should('be.visible')
        cy.get('[data-test="summary-balance"]').should('contain', 'USD')
    })
})

