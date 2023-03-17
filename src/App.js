import React, { Component } from 'react';
import Produtos from './components/Produtos';
import './App.css';

export class App extends Component {
  render() {
    return (
      <div className='App'>
        <Produtos />
      </div>
    )
  }
}

export default App
