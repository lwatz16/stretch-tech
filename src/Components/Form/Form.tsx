import React, {Component} from 'react';
import './Form.css';

interface Props {
  searchForRecipes: (ingredient: string[]) => void;
}

interface State {
  [key: string]: string,
}

class Form extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ingredient0: ''
    }
  }

  updateForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ [e.target.name]: e.target.value })
  }

  getRecipes = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    this.props.searchForRecipes(Object.values(this.state));
  }

  addField = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const numberOfFields = Object.keys(this.state);
    if (numberOfFields.length < 5) {
      let fieldNumber = `ingredient${numberOfFields.length}`;
      this.setState({ ...this.state, [fieldNumber]: ''})
    }
  }

  render() {
    let inputs = Object.keys(this.state).map(key => <input type='text' placeholder='example: chicken' value={this.state[key]} name={key} key={key} onChange={(e) => this.updateForm(e)}/>);

    return(
      <form>
        <h2>What ingredients would you like to use?</h2>
        {inputs}
        <button className='add-input-btn' onClick={(e) => this.addField(e)}>+</button>
        <button className='search-btn' onClick={(e) => this.getRecipes(e)}>Find Recipes</button>
      </form>
    )
  }
}

export default Form;