/* eslint-disable no-undef */

describe("Application", () => {
  beforeEach(() => {
    window.localStorage.setItem('accessToken', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzhmMTdmOGE0YjYyMDAxYzg1MjQ2NiIsImlhdCI6MTY4NTY0Nzc0MywiZXhwIjoxNjg1NjQ4OTQzfQ.43lvfpNb2gKEICqiTimKofnNSNUmjCPIkhJ-B4M6xf4')
    window.localStorage.setItem('refreshToken', '871513da1c53bccc250339842bbb26993501242893e3817913186928fb8bb12d7880db703199b17d')

    cy.intercept("GET", "ingredients", { fixture: "ingredients" }).as("getIngredients");
    // cy.intercept("GET", "api/user", { fixture: "login" }).as("getUser");
    cy.intercept('POST', 'api/orders', { fixture: 'orders' }).as('order');
    cy.visit("http://localhost:3000/");
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

  it('should drag ingredients in burger constructor and put an order', () => {

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
    cy.wait('@order').its('request.body').should('deep.equal',{"ingredients":["60666c42cc7b410027a1a9b1","60666c42cc7b410027a1a9b7","60666c42cc7b410027a1a9b5","60666c42cc7b410027a1a9b1"]});
    cy.get('[data-elem=modal]').contains('333').should('exist');
    cy.get("[data-elem=modal-closer]").click();
  });
});