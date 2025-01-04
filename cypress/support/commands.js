"use strict";
Cypress.Commands.add('addTransaction', (type, amount, category) => {
    cy.get('[data-test="transaction-type"]').select(type);
    cy.get('[data-test="transaction-amount"]').type(amount.toString());
    cy.get('[data-test="transaction-category"]').type(category);
    cy.get('[data-test="submit-transaction"]').click();
});
//# sourceMappingURL=commands.js.map