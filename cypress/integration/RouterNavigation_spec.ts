describe('Router Navigation', () => {
  const appId = Cypress.env('appId');
  const appKey = Cypress.env('appKey');

  beforeEach(() => {
    cy.intercept('GET', `https://api.edamam.com/api/recipes/v2/be262659c04aed267fd34c2b0606ed6e?type=public&app_id=${appId}&app_key=${appKey}`, {
      fixture: 'single-recipe.json'
    }).as('getSingleRecipe')

    cy.intercept('GET', `https://api.edamam.com/api/recipes/v2?type=public&q=blueberries%20almonds&app_id=${appId}&app_key=${appKey}`, {
      fixture: 'search-results.json'
    }).as('getRecipes')

    cy.visit(Cypress.env('url'))
    cy.get('.inputs-wrapper input').type('blueberries')
      .get('.add-ingredient-btn').click()
      .get('.inputs-wrapper input').type('almonds')
      .get('.add-ingredient-btn').click()
  })


  it('should contain the query parameters and recipe id in the urls when you click their respective buttons', () => {
    cy.get('.search-btn').click()
      .location('href').should('eq', 'http://localhost:3000/ingredients/blueberries%20almonds')
      .get('.recipe-card:first button').click()
      .location('href').should('eq', 'http://localhost:3000/recipe/be262659c04aed267fd34c2b0606ed6e')
  });

  it('should change back to the previous URL, with the search terms in the url and without the recipe id', () => {
    cy.get('.search-btn').click()
      .get('.recipe-card:first button').click()
      .get('a.back-button').should('contain', 'Back to Results').click()
      .location('href').should('eq', 'http://localhost:3000/ingredients/blueberries%20almonds')
      .get('main .ingredient-form').contains('What ingredients would you like to use?')

  });

  it('should be able to enter ingredients to find recipes, and be able to click a button for more details', () => {
    cy.get('.search-btn').click()
      .get('.recipe-card:first button').click()
      .get('.single-recipe-wrapper h2').should('contain', 'Blueberry Almond Baked Salmon')
  });

  it('should match the title and calories from the recipe card that was clicked', () => {
    cy.get('.search-btn').click()
      .get('.recipe-card:first h3').contains('Blueberry Almond Baked Salmon')
      .get('.recipe-card:first p').contains('185 cal')
  });

  it('should no longer display recipe details when you click on the back button to go back to recipe list', () => {
    cy.get('.search-btn').click()
      .get('.recipe-card:first button').click()
      .get('section.single-recipe-wrapper .back-button').contains('Back to Results')
      .click()
      .get('main').should('not.contain', '.single-recipe-wrapper')
      .location('href').should('eq', 'http://localhost:3000/ingredients/blueberries%20almonds')
  });

  it('should still display recipe list and filters when clicking to go back, if they had been previously applied', () => {
    cy.get('.search-btn').click()
      .get('main .recipe-card').and('have.length', 2)
      .get('.search-results select').select('Dairy-Free')
      .get('main .recipe-card').should('have.length', 1)
      .get('.recipe-card:first button').click()
      .get('a.back-button').should('contain', 'Back to Results').click()
      .get('main .recipe-card').should('have.length', 1)
  });

  it('should redirect the user back to the dashboard if an incorrect recipe id is entered in the url', () => {
    cy.visit(Cypress.env('url') + '/this-should-redirect')
      .location('href').should('eq', 'http://localhost:3000/')
    cy.visit(Cypress.env('url') + '/ingredients')
      .location('href').should('eq', 'http://localhost:3000/')
    cy.visit(Cypress.env('url') + '/recipe/')
      .location('href').should('eq', 'http://localhost:3000/')
    cy.visit(Cypress.env('url') + '/recipe/8675309')
      .location('href').should('eq', 'http://localhost:3000/')
  });
})