import {Component} from 'react';
import './Form.css';

class Form extends Component {
  state = {
    ingredient1: ''
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
      </form>
    )
  }
}

export default Form;