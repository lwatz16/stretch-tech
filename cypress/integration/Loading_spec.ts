describe('Loading', () => {
  const appId = Cypress.env('appId')
  const appKey = Cypress.env('appKey')

  beforeEach(() => {
    cy.visit(Cypress.env('url'))

    cy.intercept('GET', `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=${appId}&app_key=${appKey}`, {
      fixture: 'search-results.json'
    }).as('getRecipes')

    cy.intercept(
      `https://api.edamam.com/api/recipes/v2/be262659c04aed267fd34c2b0606ed6e?type=public&app_id=${appId}&app_key=${appKey}`, {
      fixture: 'single-recipe.json'
    }).as('getSingleRecipe')
  })
  
  it('should show a loading component when I click Find Recipes and View button', () => {
    cy.get('input')
      .type('chicken')

    cy.get('.add-input-btn')
      .click()

    cy.get('.search-btn')
      .contains('Find Recipes')
      .click()

    cy.get('.loading')
      .should('be.visible')

    cy.get('.recipe-card')
      .first()
      .find('button')
      .contains('View')
      .click()

    cy.url()
      .should('eq', Cypress.env('url') + 'recipe/be262659c04aed267fd34c2b0606ed6e')

    cy.get('.loading')
      .should('be.visible')
  })
})