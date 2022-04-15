describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should display a header, background image and form', () => {
    cy.get('form')
      .should('be.visible')

    cy.get('h1')
      .contains('Recip-Eco')

    cy.get('img')
      .should('have.class', 'background-image')
      .should('have.attr', 'src')
      .and('contain', 'https://images.unsplash.com/photo-1543352634-99a5d50ae78e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80')
  })

  


  it('should see a form that contains one input, an add ingredient button, and a search button', () => {
    cy.get('form')
      .contains('What ingredients would you like to use?')
  })
})