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
  
  it('should show a loading component when I click the Find Recipes button and View button on the HomePage', () => {
    cy.get('input')
      .type('chicken')

    cy.get('.add-ingredient-btn')
      .click()

    cy.get('.search-btn')
      .contains('Find Recipes')
      .click()

    cy.get('.loading-on-search')
      .should('be.visible')

    cy.get('.recipe-card')
      .first()
      .find('button')
      .contains('View')
      .click()

    cy.wait('@getSingleRecipe').then(interception => {
      const response = interception.response.body.recipe;
      cy.get('.loading-on-single')
        .should('be.visible')
      expect(response.calories).to.eq(184.9062325245606)
    })

    cy.url()
      .should('eq', Cypress.env('url') + 'recipe/be262659c04aed267fd34c2b0606ed6e')
  })

  it('should show a loading component when I click Back to Results button', () => {
    cy.get('input')
      .type('chicken')

    cy.get('.add-ingredient-btn')
      .click()

    cy.get('.search-btn')
      .contains('Find Recipes')
      .click()

    cy.get('.recipe-card')
      .first()
      .find('button')
      .contains('View')
      .click()
    
    cy.url()
      .should('eq', Cypress.env('url') + 'recipe/be262659c04aed267fd34c2b0606ed6e')

    cy.get('button')
      .contains('Back to Results')
      .click()

    cy.wait('@getRecipes').then(() => {
      cy.get('.loading-on-search')
        .should('be.visible')
    })

    cy.url()
      .should('eq', Cypress.env('url') + 'ingredients/chicken')
  })
})