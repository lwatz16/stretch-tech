import { Component } from 'react';
import type { RecipeInterface } from '../App';
import apiCalls from '../apiCalls';

interface SingleRecipeProps {
  backToSearchResults: () => void,
  uri: string
}

interface SingleRecipeState extends RecipeInterface {
  ingredientLines: string[]
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
      ingredientLines: []
    }
  }

  getRecipe = (uri: string) => {
    apiCalls.fetchSingleRecipe(uri)
      .then(data => this.setState({ uri: data.recipe.uri, label: data.recipe.label, url: data.recipe.url, yield: data.recipe.yield, dietLabels: data.recipe.dietLabels, healthLabels: data.recipe.healthLabels, calories: data.recipe.calories, mealType: data.recipe.mealType, cuisineType: data.recipe.cuisineType, images: {REGULAR: {url: data.recipe.images.REGULAR.url}}, ingredientLines: data.recipe.ingredientLines }))
      .catch(err => console.log(err));
  }

  componentDidMount = () => this.getRecipe(this.props.uri)

  render() {
    let dietLabels = this.state.dietLabels.join(', ');
    let healthLabels = this.state.dietLabels.join(', ');
    let mealType = this.state.mealType.join(', ');
    let cuisineType = this.state.cuisineType.join(', ');

    return (
      <section className='single-recipe-wrapper'>
        <button type='button' onClick={this.props.backToSearchResults}>Back to Results</button>
        <img src={this.state.images.REGULAR.url} alt={this.state.label}/>
        <h2>{this.state.label}</h2>
        <p>{this.state.yield} servings</p>
        <p>{this.state.calories.toFixed(2)} cal</p>
        <p>{dietLabels}</p>
        <p>{healthLabels}</p>
        <p>{mealType}</p>
        <p>{cuisineType}</p>
        <button><a href={this.state.url} target='_blank'>See Full Recipe</a></button>
      </section>
    )
  }
}

export default SingleRecipe;