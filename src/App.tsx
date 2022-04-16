import {Component} from 'react';
import Header from './Components/Header';
import Form from './Components/Form';
import SearchResults from './Components/SearchResults';
import SingleRecipe from './Components/SingleRecipe';
import apiCalls from './apiCalls';
import { Route } from 'react-router-dom';
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
  singleRecipeView: string,
  error: string,
  healthLabels: string[],
  filterBy: string,
  currentIngredients: string[]
} 

interface IndividualRecipe {
  recipe: RecipeInterface
}

class App extends Component {
  state: StateInterface = {
    recipes: [],
    healthLabels: [],
    singleRecipeView: '',
    error: '',
    filterBy: '',
    currentIngredients: []
  }

  searchForRecipes = (ingredients: string[]) => {
    apiCalls.searchRecipes(ingredients).then(data => {
      let allRecipes = data.hits.map((recipe: IndividualRecipe) => recipe.recipe)
      this.setState({ error: '' });
      if (!allRecipes.length) {
        this.setState({ error: 'No search results found. Please try a different combination.' });
      }
      this.setState({ recipes: allRecipes, healthLabels: this.getHealthLabels(allRecipes) })
    }).catch(err => this.setState({ error: `Something went wrong, please try again later. ${err}.` }))
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

  seeRecipe = (uri: string) => {
    this.setState({ singleRecipeView: uri })
  }

  backToSearchResults = () => {
    this.setState({ singleRecipeView: false })
  }

  render() {
    return (
      <div className="App">
        <img className="background-image" src="https://images.unsplash.com/photo-1543352634-99a5d50ae78e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" alt="Overhead view of an aesthetically pleasing table-spread.  Mmmm smell the spices wafting off of the perfectly prepaired sweet potatos."/>
        <Header />
        <main>
          <Route exact path="/" render={() => <Form loadCurrentIngredients={this.loadCurrentIngredients} searchForRecipes={this.searchForRecipes} />}/>
          {/* !this.state.singleRecipeView && <Form searchForRecipes={this.searchForRecipes} />*/} 
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
                  seeRecipe={this.seeRecipe} 
                  error={this.state.error}
                  query={match.params.query}
                  searchForRecipes={this.searchForRecipes}
                />
              </div>
            )}
          }/>
          <Route path="/recipe/:recipeId" render={({ match }) => {
            return (
              <SingleRecipe backToSearchResults={this.backToSearchResults} uri={this.state.singleRecipeView} recipeId={match.params.recipeId} seeRecipe={this.seeRecipe} />
            )
          }}/>

          {/* {this.state.singleRecipeView && <SingleRecipe backToSearchResults={this.backToSearchResults} uri={this.state.singleRecipeView} />} */}
        </main>
      </div>
    );
  }
  
}

export default App;
export type {RecipeInterface};


