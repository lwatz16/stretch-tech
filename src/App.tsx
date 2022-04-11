import {Component} from 'react';
import Header from './Components/Header';
import Form from './Components/Form';
import SearchResults from './Components/SearchResults';
import apiCalls from './apiCalls';
import './Css/styles.css';

class App extends Component {
  state = {
    recipes: [],
    error: null
  }

  searchForRecipes = (ingredients: string[]) => {
    apiCalls.searchRecipes(ingredients).then(data => this.setState({ recipes: data.hits }))
  }

  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <Form searchForRecipes={this.searchForRecipes} />
          
        </main>
      </div>
    );
  }
  
}

export default App;
