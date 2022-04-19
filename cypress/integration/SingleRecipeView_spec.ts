

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
        .siblings('.recipe-details').within(details => {
          cy.contains('Servings: 2')
          cy.contains('Calories: 185')
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
    cy.get('.back-button').should('contain', 'Back to Home').click()
      .location('href').should('eq', 'http://localhost:3000/')
      .get('main')
      .children('.ingredient-form').contains('What ingredients would you like to use?')
  });

  it('should display a message to the user if there is a network error', () => {
    cy.intercept('GET', `https://api.edamam.com/api/recipes/v2/205022c0a4e99c4a6aefd3334175a079?type=public&app_id=${appId}&app_key=${appKey}`, {
      forceNetworkError: true
    }).as('singleRecipeNetworkError')

    cy.visit(Cypress.env('url') + 'recipe/205022c0a4e99c4a6aefd3334175a079')
    cy.wait('@singleRecipeNetworkError')

    cy.get('section.single-recipe-wrapper')
      .contains('Something went wrong, please try again later.')
  });

});
