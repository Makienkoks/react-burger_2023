/* eslint-disable no-undef */

describe("Modals", () => {
  beforeEach(() => {
    cy.getIngredientsAndVisit();
  });

  it("should shoe VVV after click on 1st element", () => {
    cy.contains('Соберите бургер');
  });

  it('should open modal/close ESC', () => {
    cy.get("[data-elem=ingredient]").contains('Краторная булка N-200i').click();
    cy.get("[data-elem=modal]").contains('Детали ингредиента').should('exist');
    cy.get("[data-elem=modal]").contains('Краторная булка N-200i').should('exist');
    cy.get('body').type('{esc}');
    cy.get("[data-elem=modal]").should('not.exist');
  });

  it('should open modal/close CLICK', () => {
    cy.get("[data-elem=ingredient]").contains('Краторная булка N-200i').click();
    cy.get("[data-elem=modal]").contains('Детали ингредиента').should('exist');
    cy.get("[data-elem=modal]").contains('Краторная булка N-200i').should('exist');
    cy.get("[data-elem=modal-closer]").click();
    cy.get("[data-elem=modal]").should('not.exist');
  });
});