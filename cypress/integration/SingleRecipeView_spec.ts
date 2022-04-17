describe('SingleRecipeView', () => {
  const appId = Cypress.env('appId');
  const appKey = Cypress.env('appKey');
  
  beforeEach(() => {
    
    
    cy.intercept('GET', `https://api.edamam.com/api/recipes/v2/be262659c04aed267fd34c2b0606ed6e?type=public&app_id=${appId}&app_key=${appKey}`, {
      fixture: 'single-recipe.json'
    }).as('getSingleRecipe')
    
    cy.visit(Cypress.env('url') + 'recipe/be262659c04aed267fd34c2b0606ed6e')
  })

  it('should be able to enter ingredients to find recipes, and be able to click a button for more details', () => {
    // cy.get('.inputs-wrapper input')
    //   .type('chicken')
    //   .get('.add-input-btn')
    //   .click()
    //   .get('.search-btn')
    //   .click()
      // .get('.search-results select')
      // .select('Dairy-Free')
      // .get('.recipe-card:first button')
      // .click()
      cy.get('.single-recipe-wrapper h2').should('contain', 'Blueberry Almond Baked Salmon')

    
  });

  it('should render a new page for single recipe details, hiding the form and recipe list', () => {
    cy.get('main')
      .children('.single-recipe-wrapper').should('exist')
      .get('form').should('not.exist')
      .get('.recipe-cards').should('not.exist')
  });

  it.skip('should match the title and calories from the recipe card that was clicked', () => {

  });

  it.only('should render a single recipe page containing an image, recipe name, calories, diet labels, health labels, and ingredients', () => {
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
      // .children('img')
      // .siblings('h2')
      // .siblings('p') // need to add classes or id's to test individual elements
  });

  it('should contain a button to an external site that allows me to view the full recipe', () => {
    cy.get('section.single-recipe-wrapper').within(recipe => {
      cy.get('a.back-button')
        .children('button').contains('Back to ')
    })
  });

  it.skip('should display a back button that allows me to return to the homepage w/ search results', () => {
    cy.get('section.single-recipe-wrapper')
      .children('button').should('contain', 'Back to Results')
      .click()
      .get('main')
      .should('contain', 'form')
      .and('contain', '.recipe-cards')
  });

  it.skip('should contain the recipe id in the url when you click to see recipe details', () => {

  });

  it.skip('should change back to the previous URL, with the search terms in the url and without the recipe id', () => {

  });

  it.skip('should no longer display recipe details when you click on the back button to go back to recipe list', () => {
    cy.get('section.single-recipe-wrapper')
      .children('button').should('contain', 'Back to Results')
      .click()
      .get('main')
      .should('not.contain', '.single-recipe-wrapper')
  });

  it.skip('should still display recipe list and filters when clicking to go back, if they had been previously applied', () => {
    cy.get('section.single-recipe-wrapper')
      .children('button').should('contain', 'Back to Results')
      .click()
      .get('main')
      .should('contain', '.recipe-cards')
      .children('.search-results select')
      //need to get the value of the select to test if it is still dairy free -> also need to reset the select on back button click
  });

  it.skip('should display a message to the user if there is a network error', () => {

  });

  it.skip('should redirect the user back to the dashboard if an incorrect recipe id is entered in the url', () => {

  });
});