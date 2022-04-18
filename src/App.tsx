import {Component} from 'react';
import Header from './Components/Header';
import Form from './Components/Form';
import SearchResults from './Components/SearchResults';
import SingleRecipe from './Components/SingleRecipe';
import apiCalls from './apiCalls';
import { Route, Redirect, Switch } from 'react-router-dom';
import './Css/styles.css';

interface RecipeInterface {
  uri: string,
  label: string,
  images: {
    REGULAR: {
      url: string
    }
  },
  url: string,
  yield: number,
  dietLabels: string[],
  healthLabels: string[],
  calories: number,
  mealType: string[],
  cuisineType: string[],
}

interface StateInterface {
  recipes: RecipeInterface[],
  error: string,
  healthLabels: string[],
  filterBy: string,
  currentIngredients: string[],
  isLoading: boolean,
} 

interface IndividualRecipe {
  recipe: RecipeInterface
}

class App extends Component {
  state: StateInterface = {
    recipes: [],
    healthLabels: [],
    error: '',
    filterBy: '',
    currentIngredients: [],
    isLoading: false
  }

  searchForRecipes = (ingredients: string[]) => {
    this.setState({ isLoading: true })
    apiCalls.searchRecipes(ingredients).then(data => {
      let allRecipes = data.hits.map((recipe: IndividualRecipe) => recipe.recipe)
      this.setState({ error: '', isLoading: false });
      if (!allRecipes.length) {
        this.setState({ error: 'No search results found. Please try a different combination.' });
      }
      this.setState({ recipes: allRecipes, healthLabels: this.getHealthLabels(allRecipes) })
    }).catch(err => this.setState({ error: `Something went wrong, please try again later. ${err}.`, isLoading: false }))
  }

  loadCurrentIngredients = async (ingredients: string[]) => {
    await this.setState({ currentIngredients: ingredients })
    this.searchForRecipes(this.state.currentIngredients)
  }

  getHealthLabels = (recipes: RecipeInterface[]) => {
    let healthLabels: string[] = [];
    recipes.forEach((recipe: RecipeInterface) => {
      recipe.healthLabels.forEach(( label: string ) => {
        if (!healthLabels.includes(label)) {
          healthLabels.push(label);
        }
      })
    })
    return healthLabels;
  }

  applyFilter = (filter: string) => {
    this.setState({ filterBy: filter})
  }

  backToSearchResults = () => {
    this.setState({ singleRecipeView: false })
  }

  render() {
    return (
      <div className="App">
        <img className="background-image" src="https://images.unsplash.com/photo-1543352634-99a5d50ae78e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" alt="A colorful table spread with sweet potato fries, pico de gallo, sour cream, and guacamole."/>
        <Header />
        <main>
          <Switch>
            <Route exact path="/" render={() => <Form loadCurrentIngredients={this.loadCurrentIngredients} searchForRecipes={this.searchForRecipes} />} />
            <Route path="/ingredients/:query" render={({ match }) => {
              console.log(match.params)
              return (
                <div>
                  <Form loadCurrentIngredients={this.loadCurrentIngredients} searchForRecipes={this.searchForRecipes} />
                  <SearchResults
                    applyFilter={this.applyFilter}
                    filterBy={this.state.filterBy}
                    healthLabels={this.state.healthLabels}
                    recipes={this.state.recipes}
                    error={this.state.error}
                    query={match.params.query}
                    searchForRecipes={this.searchForRecipes}
                    isLoading={this.state.isLoading}
                  />
                </div>
              )
            }
            } />
            <Route path="/recipe/:recipeId" render={({ match }) => {
              return (
                <SingleRecipe currentIngredients={this.state.currentIngredients} backToSearchResults={this.backToSearchResults} recipeId={match.params.recipeId} />
              )
            }} />
            <Route render={({ match }) => {
              return (
                <Redirect to='/' />
              )
            }} />
          </Switch>
          

          </main>
      </div>
    );
  }
  
}

export default App;
export type {RecipeInterface};


