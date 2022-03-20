describe('to-do app', () => {
  beforeEach(() => {
    cy.visit('./index.html');
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

  it('add todo ', () => {
    cy.get('#item').click().type('Nouvelle todo') // select and type 'Nouvelle todo' into the 'input'
    cy.get('#addTodo').click(); // click on the button to add the todo
    //Check
    cy.get('.liste-todo')
      .contains('Nouvelle todo') // Verify if the todo has been added
  })

  it('delete todo', () => {
    cy.get('#item').click().type('Nouvelle todo') // select button
    //Check
    cy.get('.delete').should('have.length', 2) // Verify todo deleted
  })
});
