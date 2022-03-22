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

  it('should contain 2 todos', () => {
    cy.get('ul li').should('have.length', 2);
  });

  it('create 2 todos', () => {
    cy.get('input').type('Buy milk');
    cy.get('form').submit();
    cy.get('input').type('Buy eggs');
    cy.get('form').submit();
    cy.get('ul').children().should('have.length', 4);
  });

  it('complete all todos', () => {
    cy.get('ul li').each(($el, index, $list) => {
      cy.wrap($el).click();
    });
    cy.get('ul li').should('have.class', 'completed');
    cy.get('ul').children().should('have.length', 2);
  })

  /* it('delete todo', () => {
    cy.get('li').eq(1).find('div.close').click();
    cy.get('ul').children().should('have.length', 1);
  }) */
}); 
