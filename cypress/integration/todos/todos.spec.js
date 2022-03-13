describe('to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should contain 1 form', () => {
    cy.get('form').should('be.visible');
  });

  it('displays 2 todos by default', () => {
    cy.get('.liste-todo li').should('have.length', 2);
    cy.get('ul li').first().should('have.text', 'My to-do 1');
    cy.get('ul li').last().should('have.text', 'My to-do 2');
  });

  it('can add a new todo item', () => {
    const newItem = 'Do the unit test project';
    cy.get('[id=item]').type(`${newItem}{enter}`);

    cy.get('.liste-todo li')
      .should('have.length', 3)
      .last().should('have.text', newItem);
  });
});
