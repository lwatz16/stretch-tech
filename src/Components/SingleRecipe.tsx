import { Component } from 'react';
import type { RecipeInterface } from '../App';
import apiCalls from '../apiCalls';

interface SingleRecipeProps {
  backToSearchResults: () => void
}

class SingleRecipe extends Component<SingleRecipeProps, RecipeInterface> {
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
    }
  }

  getRecipe = (uri: string) => {
    apiCalls.fetchSingleRecipe(uri)
      .then(data => this.setState({ uri: data.recipe.uri, label: data.recipe.label, url: data.recipe.label, yield: data.recipe.yield, dietLabels: data.recipe.dietLabels, healthLabels: data.recipe.healthLabels, calories: data.recipe.calories, mealType: data.recipe.mealType, cuisineType: data.recipe.cuisineType, images: {REGULAR: {url: data.recipe.images.REGULAR.url}} }))
  }

  render() {
    return (
      <section>

      </section>
    )
  }
}

export default SingleRecipe;