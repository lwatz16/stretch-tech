import { Component } from 'react';
import type { RecipeInterface } from '../App';
import apiCalls from '../apiCalls';
import { Link } from 'react-router-dom';

interface SingleRecipeProps {
  backToSearchResults: () => void,
  recipeId: string,
  currentIngredients: string[]
}

interface SingleRecipeState extends RecipeInterface {
  ingredientLines: string[],
  error: string
}

class SingleRecipe extends Component<SingleRecipeProps, SingleRecipeState> {
  constructor(props: SingleRecipeProps) {
    super(props);
    this.state = {
      uri: '',
      label: '',
      images: {
        REGULAR: {
          url: ''
        }
      },
      url: '',
      yield: 0,
      dietLabels: [],
      healthLabels: [],
      calories: 0,
      mealType: [],
      cuisineType: [],
      ingredientLines: [],
      error: ''
    }
  }

  getRecipe = (uri: string) => {
    apiCalls.fetchSingleRecipe(uri)
      .then(data => this.setState({ uri: data.recipe.uri, label: data.recipe.label, url: data.recipe.url, yield: data.recipe.yield, dietLabels: data.recipe.dietLabels, healthLabels: data.recipe.healthLabels, calories: data.recipe.calories, mealType: data.recipe.mealType, cuisineType: data.recipe.cuisineType, images: {REGULAR: {url: data.recipe.images.REGULAR.url}}, ingredientLines: data.recipe.ingredientLines, error: '' }))
      .catch(err => this.setState({ error: `Something went wrong, please try again later. ${err}.` }));
  }

  componentDidMount = () => {
    this.getRecipe(this.props.recipeId)
  }

  render() {
    let dietLabels = this.state.dietLabels.join(', ');
    let healthLabels = this.state.dietLabels.join(', ');
    let mealType = this.state.mealType.join(', ');
    let cuisineType = this.state.cuisineType.join(', ');
    let ingredientsList = this.state.ingredientLines.map((ingredient, index) => <p key={index}>{ingredient}</p>)
    let nextPath = this.props.currentIngredients.join('%20');

    return (
      <section className='single-recipe-wrapper'>
        {!this.props.currentIngredients.length &&
          <Link to={`/`}>
            <button type='button'>Back to Home</button>
          </Link> 
        }
        {!!this.props.currentIngredients.length &&
          <Link to={`/ingredients/${nextPath}`}>
            <button type='button'>Back to Results</button>
          </Link> 
        }
        <div className='error'>{this.state.error}</div>
        {!!this.state.uri.length && (
          <div>
            <img src={this.state.images.REGULAR.url} alt={this.state.label} />
            <h2>{this.state.label}</h2>
            <p>{this.state.yield} servings</p>
            <p>{this.state.calories.toFixed(2)} cal</p>
            <p>{dietLabels}</p>
            <p>{healthLabels}</p>
            <p>{mealType}</p>
            <p>{cuisineType}</p>
            <p>Ingredients: </p>
            {ingredientsList}
            <a href={this.state.url} target='_blank'><button>See Full Recipe</button></a>
          </div>
        )}
      </section>
    )
  }
}

export default SingleRecipe;