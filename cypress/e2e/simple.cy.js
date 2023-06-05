/* eslint-disable no-undef */
describe("Application", () => {
    beforeEach(() => {
      console.log(Cypress.env().accessToken)

      window.localStorage.setItem(
          "refreshToken",
          JSON.stringify(Cypress.env().refreshToken)
      );
      window.localStorage.setItem(
          "accessToken",
          JSON.stringify(Cypress.env().accessToken)
      );

      cy.intercept("GET", "https://norma.nomoreparties.space/api/auth/user?", {
        fixture: "user",
      }).as("authUser");
      cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {
        fixture: "order",
      }).as("order");
      cy.getIngredientsAndVisit();
  })

  it("should drag ingredients in burger constructor and put an order", () => {
    cy.contains("Соберите бургер");

    cy.get('[data-elem=ingredient]').contains('Краторная булка N-200i').trigger('dragstart');
    cy.get('[data-elem=constructor]').trigger('drop');

    cy.get('[data-elem=ingredient]').contains('Соус Spicy-X').trigger('dragstart');
    cy.get('[data-elem=constructor]').trigger('drop');

    cy.get('[data-elem=ingredient]').contains('Говяжий метеорит (отбивная)').trigger('dragstart');
    cy.get('[data-elem=constructor]').trigger('drop');

    cy.get('[data-elem=constructorTop]').contains('Краторная булка N-200i').should('exist');
    cy.get('[data-elem=constructorBody]').contains('Соус Spicy-X').should('exist');
    cy.get('[data-elem=constructorBody]').contains('Говяжий метеорит (отбивная)').should('exist');
    cy.get('[data-elem=constructorBottom]').contains('Краторная булка N-200i').should('exist');

    cy.get('[data-elem=buttonOrder]').click();
    cy.wait('@order').its('request.body').should('deep.equal',{
      "ingredients":["60666c42cc7b410027a1a9b1","60666c42cc7b410027a1a9b7","60666c42cc7b410027a1a9b5","60666c42cc7b410027a1a9b1"]
    });

    cy.get("[data-elem=modal]").contains('333').should('exist');
    cy.get("[data-elem=modal-closer]").click();
  });
});