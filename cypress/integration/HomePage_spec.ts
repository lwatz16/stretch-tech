describe('HomePage', () => {
  const appId = Cypress.env('appId')
  const appKey = Cypress.env('appKey')

  beforeEach(() => {
    cy.visit(Cypress.env('url'))

    cy.intercept('GET', `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=${appId}&app_key=${appKey}`, {
      fixture: 'search-results.json'
    }).as('getRecipes')

    cy.intercept('GET', `https://api.edamam.com/api/recipes/v2?type=public&q=beef%20banana%20anchovies&app_id=${appId}&app_key=${appKey}`, {
      fixture: 'no-results.json'
    }).as('getNoResults')

    cy.intercept('GET', `https://api.edamam.com/api/recipes/v2?type=public&q=chick&app_id=${appId}&app_key=${appKey}`, {
      forceNetworkError: true
    }).as('getNetworkFailure')
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

  it('should see a form that contains one input, an add ingredient button, a search button, and clear ingredients button', () => {
    cy.get('form')
      .contains('What ingredients would you like to use?')

    cy.get('input')
      .should('have.attr', 'placeholder')
      .and('contain', 'example: blueberries')

    cy.get('button')
      .first()
      .should('have.class', 'clear-ingredients')

    cy.get('button')
      .last()
      .should('have.class', 'search-btn')

    cy.get('.add-input-btn')
      .contains('Add Ingredient')
      .should('have.attr', 'aria-label')
      .and('match', /Add New Search Field/)
  })

  it('should contain a list of ingredients that I am searching for. (On page load, there are none.)', () => {
    cy.get('.ingredients-to-search')
      .contains('Ingredient list: none')
  })

  it('should update the input field to reflect the ingredient that I typed', () => {
    cy.get('input')
      .type('chicken')
      .should('have.value', 'chicken')
  })

  it('should add the text from my input field into the list of ingredients when I click the "Add Ingredient" button', () => {
    cy.get('input')
      .type('fish')
      .should('have.value', 'fish')

    cy.get('.add-input-btn')
      .click()
    
    cy.get('.ingredients-to-search')
      .contains('Ingredient list: fish')

    cy.get('input')
      .type('avocado')
      .should('have.value', 'avocado')

    cy.get('.add-input-btn')
      .click()

    cy.get('.ingredients-to-search')
      .contains('Ingredient list: fish, avocado')
  })

  it('should update the URL path to include my query parameters when I click on Find Recipes', () => {
    cy.get('input')
      .type('chicken')

    cy.get('.add-input-btn')
      .click()

    cy.get('.search-btn')
      .click()

    cy.url()
      .should('eq', Cypress.env('url') + 'ingredients/chicken')
  })

  it('should see a grid of images with recipe titles, calories, and button to see recipe details after I click on Find Recipes', () => {
    cy.get('input')
      .type('chicken')

    cy.get('.add-input-btn')
      .click()

    cy.get('.search-btn')
      .click()

    cy.url()
      .should('eq', Cypress.env('url') + 'ingredients/chicken')

    cy.get('.recipe-img')
      .should('have.attr', 'src')

    cy.get('.recipe-cards')
      .children('article')
      .should('have.length', 2)

    cy.get('.recipe-title')
      .should('be.visible')
      .should('have.css', 'color')

    cy.get('.recipe-cals')
      .contains('cal')

    cy.get('button')
      .contains('View')
  })

  it('should display a message when there are no recipes that match the search criteria (different from a network request failure)', () => {
    cy.get('input')
      .type('beef')

    cy.get('.add-input-btn')
      .click()

    cy.get('input')
      .type('banana')

    cy.get('.add-input-btn')
      .click()

    cy.get('input')
      .type('anchovies')

    cy.get('.add-input-btn')
      .click()

    cy.get('.search-btn')
      .click()
    
    cy.get('.error')
      .contains('No search results found. Please try a different combination.')
  })

  it('should display a dropdown menu with filtering options when my search results are first found', () => {
    cy.get('input')
      .type('chicken')

    cy.get('.add-input-btn')
      .click()

    cy.get('.search-btn')
      .click()
    
    cy.get('label')
      .contains('Filter:')

    cy.get('select')
      .should('have.value', '')

    cy.get('option')
      .first()
      .contains('Show all Recipes')
      .should('have.value', '')
  })

  it('should be able to click on the filter dropdown menu and select from a list of options', () => {
    cy.get('input')
      .type('chicken')

    cy.get('.add-input-btn')
      .click()

    cy.get('.search-btn')
      .click()

    cy.get('select')
      .children('option')
      .should('have.length', 31)

    cy.get('select')
      .select('Show all Recipes')
      .should('have.value', '')
      .select('Kosher')
      .should('have.value', 'Kosher')
      .select('Keto-Friendly')
      .should('have.value', 'Keto-Friendly')
  })

  it('should update the search results to reflect the new filter selected from the dropdown menu', () => {
    cy.get('input')
      .type('chicken')

    cy.get('.add-input-btn')
      .click()

    cy.get('.search-btn')
      .click()

    cy.get('select')
      .select('Keto-Friendly')

    cy.get('.recipe-cards')
      .children('article')
      .should('have.length', 1)
  })

  it('should not be able to click search/find recipes until there is at least one ingredient entered.', () => {
    cy.get('.search-btn')
      .should('be.disabled')
  })

  it('should display an error message on the search results container when the network request fails', () => {
    cy.get('input')
      .type('chick')

    cy.get('.add-input-btn')
      .click()

    cy.get('.search-btn')
      .click()

    cy.get('.error')
      .should('be.visible')
      .and('contain', 'Something went wrong, please try again later.')
  })
})