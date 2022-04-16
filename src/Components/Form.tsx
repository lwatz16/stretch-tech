import React, { Component } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  searchForRecipes: (ingredient: string[]) => void;
  loadCurrentIngredients: (ingredients: string[]) => void;
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
    const reg = /[^a-zA-Z]/;
    if (!reg.test(e.currentTarget.value)) {
      this.setState({ ingredientToAdd: e.target.value })
    }
  }

  getRecipes = () => {
    this.props.loadCurrentIngredients(this.state.ingredients)
    this.clearIngredientField();
    this.clearSearchIngredients();
  }

  clearIngredientField = () => {
    this.setState({ ingredientToAdd: '' });
  }

  clearSearchIngredients = () => {
    this.setState({ ingredients: [] });
  }

  addIngredient = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!this.state.ingredients.includes(this.state.ingredientToAdd)) {
      this.setState({ ingredients: [...this.state.ingredients, this.state.ingredientToAdd] });
    }
    this.clearIngredientField();
  }

  render() {
    let ingredients;
    let queryString = '';
    if (this.state.ingredients.length) {
      ingredients = this.state.ingredients.join(', ');
      queryString = this.state.ingredients.join('%20');
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
          <input type='text' placeholder='example: blueberries' value={this.state.ingredientToAdd} name="ingredient-field" onChange={(e) => this.updateForm(e)} />
          <div className="form-buttons">
            <button type='button' aria-label='Add New Search Field' className='add-input-btn' onClick={(e) => this.addIngredient(e)}>Add Ingredient</button>
            <Link to={`/ingredients/${queryString}`}>
              <button className='search-btn' disabled={this.state.ingredients.length ? false : true} onClick={() => this.getRecipes()}>Find Recipes</button>
            </Link>
          </div>
        </div>
      </form>
    )
  }
}

export default Form;