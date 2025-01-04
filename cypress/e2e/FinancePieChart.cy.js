describe('FinancePieChart', () => {
    const mockTransactions = [
        {
            id: 1,
            type: 'expense',
            amount: 1000,
            category: 'Food',
            currency: 'USD',
            date: '2023-01-01',
        },
        {
            id: 2,
            type: 'expense',
            amount: 300,
            category: 'Transportation',
            currency: 'EGP',
            date: '2023-01-02',
        }
    ];
    beforeEach(() => {
        // Set up localStorage with mock data
        window.localStorage.setItem('transactions', JSON.stringify(mockTransactions));
        cy.visit('/report');
    });
    // beforeEach(() => {
    //   // Intercept API calls and provide mock data
    //   cy.intercept('GET', '/api/transactions', {
    //     fixture: 'transactions.json',
    //     // statusCode: 200,
    //     // body: mockTransactions
    //   }).as('getTransactions')
    //   cy.visit('/report')
    //   cy.wait('@getTransactions')
    // })
    it('displays the pie chart with transaction data', () => {
        cy.get('[data-test="finance-pie-chart"]').should('be.visible');
        cy.get('[data-test="pie-segment"]').trigger('mouseover', { force: true });
    });
    it('displays the pie chart with expense data', () => {
        cy.get('[data-test="finance-pie-chart"]').should('be.visible');
        cy.get('svg').should('exist');
    });
    it('shows tooltip on hover', () => {
        cy.get('.widgets').first().trigger('mouseover', { force: true });
        // cy.get('[data-test="tooltip"]').first().trigger('mouseover', { force: true })
        // cy.get('[data-test="tooltip"]').should('be.visible')
        // cy.get('svg').should('be.visible')
        // cy.contains('.v-').should('contain', '1000')
        // cy.get('.v-tooltip-content').should('contain', 'Transportation')
    });
    it('filters transactions correctly', () => {
        // Assuming you have filter controls
        cy.get('[data-test="date-filter-start"]').type('2023-12-01');
        cy.get('[data-test="date-filter-end"]').type('2023-01-31');
        cy.get('[data-test="filter-button"]').click();
        // Check if chart updates
        cy.get('[data-test="pie-segment"]').should('have.length', 1);
    });
    it('handles empty data state', () => {
        // Intercept with empty data
        window.localStorage.setItem('transactions', JSON.stringify([]));
        cy.visit('/report');
        cy.get('[data-test="finance-pie-chart"]').should('not.exist');
    });
    it('maintains chart responsiveness', () => {
        // Test different viewport sizes
        cy.viewport('iphone-6');
        cy.get('[data-test="finance-pie-chart"]').should('be.visible');
        cy.viewport('macbook-15');
        cy.get('[data-test="finance-pie-chart"]').should('be.visible');
    });
});
export {};
//# sourceMappingURL=FinancePieChart.cy.js.map