

describe('SingleRecipeView', () => {
  const appId = Cypress.env('appId');
  const appKey = Cypress.env('appKey');
  
  beforeEach(() => {
    cy.intercept('GET', `https://api.edamam.com/api/recipes/v2/be262659c04aed267fd34c2b0606ed6e?type=public&app_id=${appId}&app_key=${appKey}`, {
      fixture: 'single-recipe.json'
    }).as('getSingleRecipe')

    cy.intercept('GET', `https://api.edamam.com/api/recipes/v2?type=public&q=blueberries%20almonds&app_id=${appId}&app_key=${appKey}`, {
      fixture: 'search-results.json'
    }).as('getRecipes')
    
    cy.visit(Cypress.env('url') + 'recipe/be262659c04aed267fd34c2b0606ed6e')
    cy.wait('@getSingleRecipe')
  })

  
  it('should render a new page for single recipe details, hiding the form and recipe list', () => {
    cy.get('main')
      .children('.single-recipe-wrapper').should('exist')
      .get('.ingredient-form').should('not.exist')
      .get('.recipe-cards').should('not.exist')
  });

  it('should render a single recipe page containing an image, recipe name, calories, diet labels, health labels, and ingredients', () => {
    cy.get('section.single-recipe-wrapper').within(recipe => {
      cy.get('img')
        .siblings('h2')
        .siblings('p').within(details => {
          cy.contains('2 servings')
          cy.contains('184.91 cal')
          cy.contains('Low-Sodium')
          cy.contains('lunch/dinner')
          cy.contains('nordic')
          cy.contains('Ingredients: ')
          cy.contains('2 ounces wild salmon fillets')
          cy.contains('2 1/2 inch orange slices')
          cy.contains('1/4 cup fresh blueberries')
          cy.contains('1 tablespoon Blue Diamond blueberry almonds')
          cy.contains('1/2 teaspoon Old Bay blackened seasoning')
          cy.contains('1/2 teaspoon thyme')
        })
    })
  });

  it('should contain a button to an external site that allows me to see full recipe', () => {
    cy.get('section.single-recipe-wrapper').within(recipe => {
      cy.get('div > a')
        .children('button').contains('See Full Recipe')
        .parent('a').should('have.attr', 'href').and('include', 'https://food52.com/recipes/40779-blueberry-almond-baked-salmon')
    })
  });

  it('should display Back to Home button that allows me to return to the homepage, if navigated to without searching for recipes', () => {
    cy.get('section.single-recipe-wrapper')
      .children('a.back-button').should('contain', 'Back to Home').click()
      .location('href').should('eq', 'http://localhost:3000/')
      .get('main')
      .children('.ingredient-form').contains('What ingredients would you like to use?')
  });

  it.skip('should display a message to the user if there is a network error', () => {

  });

});





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
      .get('.add-input-btn').click()
      .get('.inputs-wrapper input').type('almonds')
      .get('.add-input-btn').click()
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

  it.skip('should match the title and calories from the recipe card that was clicked', () => {
    cy.get('.search-btn').click()
      .get('.recipe-card:first h3').contains('Blueberry Almond Baked Salmon')
      .get('.recipe-card:first p')
  });

  it.skip('should no longer display recipe details when you click on the back button to go back to recipe list', () => {
    cy.get('.search-btn').click()
      .location('href').should('eq', 'http://localhost:3000/ingredients/blueberries%20almonds')
    //cy.wait('@getRecipes')
      .get('.recipe-card:first button').click()
    cy.wait('@getSingleRecipe')
      .get('section.single-recipe-wrapper')
      .children('.back-button').contains('Back to Results')
      .click()
      .get('main')
      .should('not.contain', '.single-recipe-wrapper')
  });

  it.skip('should still display recipe list and filters when clicking to go back, if they had been previously applied', () => {
    // cy.get('section.single-recipe-wrapper')
    //   .children('button').should('contain', 'Back to Results')
    //   .click()
    //   .get('main')
    //   .should('contain', '.recipe-cards')
    //   .children('.search-results select')

    // .get('.search-results select')
    // .select('Dairy-Free')
    //need to get the value of the select to test if it is still dairy free -> also need to reset the select on back button click
  });

  it.skip('should redirect the user back to the dashboard if an incorrect recipe id is entered in the url', () => {

  });
})