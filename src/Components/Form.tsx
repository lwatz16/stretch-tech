import React, {Component} from 'react';

interface Props {
  searchForRecipes: (ingredient: string[]) => void;
}

interface State {
  ingredientToAdd: string,
  ingredients: string[]
}

class Form extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ingredientToAdd: '',
      ingredients: []
    }
  }

  updateForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ ingredientToAdd: e.target.value })
  }

  getRecipes = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    this.props.searchForRecipes(this.state.ingredients);
    this.clearIngredientField();
    this.clearSearchIngredients();
  }

  clearIngredientField = () => {
    this.setState({ ingredientToAdd: '' });
  }

  clearSearchIngredients = () => {
    this.setState({ ingredients: [] });
  }

  addField = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    this.setState({ ingredients: [...this.state.ingredients, this.state.ingredientToAdd] });
    this.clearIngredientField();
  }

  render() {
    let ingredients;
    if (this.state.ingredients.length) {
      ingredients = this.state.ingredients.join(', ');
    } else {
      ingredients = 'none';
    }

    return(
      <form className="ingredient-form">
        <h2>What ingredients would you like to use?</h2>
        <div className="inputs-wrapper">
          <div className='ingredients-filter'>
            <p className='ingredients-to-search'>Ingredient list: {ingredients}</p>
            <button className='clear-ingredients' type='button' onClick={this.clearSearchIngredients}>Clear Ingredients</button>
          </div>
          <input type='text' placeholder='example: chicken' value={this.state.ingredientToAdd} name="ingredient-field" onChange={(e) => this.updateForm(e)} />
          <div className="form-buttons">
            <button type='button' aria-label='Add New Search Field' className='add-input-btn' onClick={(e) => this.addField(e)}>Add Ingredient</button>
            <button className='search-btn' onClick={(e) => this.getRecipes(e)}>Find Recipes</button>
          </div>
        </div>
      </form>
    )
  }
}

export default Form;