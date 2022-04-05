describe('to-do app', () => {
  beforeEach(() => {
    cy.visit('./index.html');
    cy.get('input')
      .type('Learn Cypress {enter}')
      .type('Learn React {enter}')
      .type('Learn Node {enter}')
      .type('Learn to code {enter}');
  });

  it('should contain 1 form', () => {
    cy.get('form').should('be.visible');
  });

  it('should contain 1 input', () => {
    cy.get('input').should('be.visible');
  });

  it('create 4 todos', () => {
    cy.get('ul li').should('have.length', 4);
  });

  it('should contain 4 todos ', () => {
    cy.get('ul li').should('have.length', 4);
  });

  it('complete all todos', () => {
    cy.get('input[type=checkbox]').check();
    cy.get('ul li').should('have.class', 'completed');
  });

  it('delete 1 todo', () => {
    cy.get('ul li div').eq(1)
      .should('have.class', 'close')
      .click();
    cy.get('ul li').should('have.length', 3);
  })

  it('modal should not be visible when not updating todo', () => {
    cy.get('.modal').should('not.exist')
  })

  it('modal should be visible when updating todo', () => {
    cy.get('.update:first').click();
    cy.get('.modal').should('be.visible')
  })

  it('modal can be closed when updating todo', () => {
    cy.get('.update:first').click();
    cy.get('.modal-close').click();
    cy.get('.modal').should('not.exist');
  });

  it('update todo', () => {
    cy.get('.update:first').click();
    cy.get('#input-modal').clear().type('Forget php{enter}');
    cy.contains('Forget php');
  });

  it('should contain 4 todos after update', () => {
    cy.get('.update:first').click();
    cy.get('#input-modal').clear().type('Forget php{enter}');
    cy.get('ul li').should('have.length', 4);
  });

});
