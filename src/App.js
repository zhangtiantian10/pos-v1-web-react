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
    return {...item, type};
  })
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allItems: formatItems(),
      cartItems: [],
      viewType: 'itemList'
    }
  }

  addItemCount = (item) => {
    const {cartItems} = this.state
    const findItem = cartItems.find(cartItem => cartItem.barcode === item.barcode);

    if (findItem) {
      findItem.count += 1;
    } else {
      cartItems.push({...item, count: 1});
    }

    this.setState({
      cartItems: [...cartItems]
    })
  }

  deleteItemCount = (item) => {
    const {cartItems} = this.state
    const findItem = cartItems.find(i => i.barcode === item.barcode);

    if (findItem) {
      findItem.count -= 1;
      if (findItem.count <= 0) {
        const index = cartItems.indexOf(findItem);

        cartItems.splice(index, 1);
      }
    } else {
      return
    }

    this.setState({
      cartItems: [...cartItems]
    })
  }

  changeView = (type) => {
    this.setState({
      viewType: type
    })
  }

  render() {
    const {allItems, cartItems, viewType} = this.state
    return (
      <div className="App">
        {viewType === 'itemList'
          ? <ItemList
            allItems={allItems}
            cartItems={cartItems}
            onAddItemCount={this.addItemCount}
            onDeleteItemCount={this.deleteItemCount}
            changeView={this.changeView}
          />
          : <CartItem
            cartItems={cartItems}
            changeView={this.changeView}
          />
        }
      </div>
    );
  }
}

export default App;
