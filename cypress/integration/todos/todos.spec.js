function createMyTodoList() {
  cy.get('input')
    .type('Learn Cypress {enter}')
    .type('Learn React {enter}')
    .type('Learn Node {enter}')
    .type('Learn to code {enter}');
}

describe('to-do app', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('should contain 1 form', () => {
    cy.get('form').should('be.visible');
  });

  it('should contain 1 input', () => {
    cy.get('input').should('be.visible');
  });

  it('create 4 todos', () => {
    createMyTodoList();
  });

  it('should contain 4 todos ', () => {
    createMyTodoList();
    cy.get('ul li').should('have.length', 4);
  });

  it('complete all todos', () => {
    createMyTodoList();
    cy.get('input[type=checkbox]').check();
    cy.get('ul li').should('have.class', 'completed');
  })

  it('delete 1 todos', () => {
    createMyTodoList();
    cy.get('ul li div').eq(1)
      .should('have.class', 'close')
      .click();
    cy.get('ul li').should('have.length', 3);
  })

  /* it('update todo', () => {
    
  }) */

}); 
