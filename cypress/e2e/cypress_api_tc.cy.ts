it("GET API testing Using Cypress API Plugin", () => {
  const currency: string = "EUR";
  cy.request(
    "GET",
    `https://api.fastforex.io/convert?from=${currency}&to=USD&amount=1&api_key=demo`
  ).should((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property("result");
    expect(response.body.result).to.be.a("object");
    expect(response.body.result).to.have.property("USD");
    expect(response.body.result.USD).to.be.a("number");
    expect(response.body.result.USD).to.be.greaterThan(0);
  });
});
