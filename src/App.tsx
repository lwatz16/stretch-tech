import {Component} from 'react';
import Header from './Components/Header';
import Form from './Components/Form';
import SearchResults from './Components/SearchResults';
import apiCalls from './apiCalls';
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
  error: boolean
} 

interface IndividualRecipe {
  recipe: RecipeInterface
}

class App extends Component {
  state: StateInterface = {
    recipes: [],
    error: false
  }

  searchForRecipes = (ingredients: string[]) => {
    
    apiCalls.searchRecipes(ingredients).then(data => {
      let allRecipes = data.hits.map((recipe: IndividualRecipe) => recipe.recipe)
      this.setState({ recipes: allRecipes })
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <Form searchForRecipes={this.searchForRecipes} />
          <SearchResults recipes={this.state.recipes} />
        </main>
      </div>
    );
  }
  
}

export default App;
export type {RecipeInterface};
