import React, {Component} from 'react';
import './Form.css';

interface Props {
  searchForRecipes: (ingredient: string) => void;
}

interface State {
  [key: string]: string,
}

class Form extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ingredient1: '',
      // ingredient2: '',
      // ingredient3: '',
      // ingredient4: '',
      // ingredient5: ''
    }
  }

  updateForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ [e.target.name]: e.target.value })
  }

  getRecipes = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    this.props.searchForRecipes(this.state.ingredient1);
  }

  addField = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // const target = e.target as HTMLButtonElement;
    // target.parentElement.createElement()
    // Test:
    // e.preventDefault();
    // console.log('Field added.')
  }

  render() {
    return(
      <form>
        <h2>What ingredients would you like to use?</h2>
        <input
          type='text'
          placeholder='example: chicken'
          value={this.state.ingredient1}
          name='ingredient1'
          onChange={(e)=> this.updateForm(e)}
        />
        <button className='add-input-btn' onClick={(e) => this.addField(e)}>+</button>
        <button className='search-btn' onClick={(e) => this.getRecipes(e)}>Find Recipes</button>
      </form>
    )
  }
}

export default Form;