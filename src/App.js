import React, { Component } from 'react';
import './App.css';
import ItemList from "./ItemList";
import CartItem from "./CartItem";
import {loadAllItems, loadPromotions} from './datbase';

const formatItems = () => {
  const promotions = loadPromotions();
  return loadAllItems().map(item => {
    const promotion = promotions.find(promotion => promotion.barcodes.includes(item.barcode));
    let type = ''
    if (promotion) {
      type = promotion.type
    }
    return {...item, count: 0, type};
  })
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allItems: formatItems()
    }
  }

  addItemCount = (item) => {
    const {allItems} = this.state
    const findItem = allItems.find(i => i.barcode === item.barcode);

    findItem.count += 1;
    this.setState({
      allItems: [...allItems]
    })
  }

  deleteItemCount = (item) => {
    const {allItems} = this.state
    const findItem = allItems.find(i => i.barcode === item.barcode);

    if (findItem.count === 0) {
      return
    }
    findItem.count -= 1;
    this.setState({
      allItems: [...allItems]
    })
  }

  render() {
    const {allItems} = this.state
    return (
      <div className="App">
        <ItemList
          allItems={allItems}
          onAddItemCount={this.addItemCount}
          onDeleteItemCount={this.deleteItemCount}
        />
        <CartItem/>
      </div>
    );
  }
}

export default App;
