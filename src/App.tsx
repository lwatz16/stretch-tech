import {Component} from 'react';
import './App.css';
import Header from './Components/Header/Header'

class App extends Component {
  state = {
    recipes: [],
    error: null
  }

  render() {
    return (
      <div className="App">
        <Header />
        
      </div>
    );
  }
  
}

export default App;
