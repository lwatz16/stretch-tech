import {Component} from 'react';
import './Form.css';

interface Props {
  searchSubmit: Function
}

interface State {
  ingredient1: string
}

class Form extends Component {
  constructor(props: Props) {
    super(props)
    this.state = {
      ingredient1: ''
    }
  }
  

  updateForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ [e.target.name]: e.target.value })
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
        <button className='add-input-btn'>+</button>
        <button className='search-btn'>Find Recipes</button>
      </form>
    )
  }
}

export default Form;