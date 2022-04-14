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

  render() {
    return (
      <section>

      </section>
    )
  }
}

export default SingleRecipe;