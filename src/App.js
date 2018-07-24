import React, { Component } from 'react';
import './App.css';
import ItemList from "./ItemList";
import CartItem from "./CartItem";
import {loadAllItems} from './datbase';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allItems: loadAllItems()
    }
  }
  render() {
    const {allItems} = this.state
    return (
      <div className="App">
        <ItemList allItems={allItems}/>
        <CartItem/>
      </div>
    );
  }
}

export default App;
