import {Component} from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Form from './Components/Form/Form';

class App extends Component {
  state = {
    recipes: [],
    error: null
  }

  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <Form />
        </main>
      </div>
    );
  }
  
}

export default App;
