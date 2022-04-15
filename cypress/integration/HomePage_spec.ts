describe('HomePage', () => {
  it('should display a form', () => {
    cy.visit('http://localhost:3000/')
      .get('form')
      .should('be.visible')
      .and('contains', 'input')
  })
})