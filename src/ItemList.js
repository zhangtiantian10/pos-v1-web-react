import React, {PureComponent} from 'react';

class ItemList extends PureComponent {

  renderEditCount = (item, cartItems) => {
    const findItem = cartItems.find(c => c.barcode === item.barcode);
    return <div className="input-group mb-3 col-md-6 offset-md-3">
      <div className="input-group-prepend">
        <span className="input-group-text" onClick={() => this.props.onDeleteItemCount(item)}>-</span>
      </div>
      <input type="text" className="form-control" value={findItem ? findItem.count : 0}/>
      <div className="input-group-append">
        <span className="input-group-text" onClick={() => this.props.onAddItemCount(item)}>+</span>
      </div>
      <span className="mt-2 ml-2">{item.unit}</span>
    </div>
  }

  render() {
    return <div className="mt-3">
      <h1>商品列表</h1>
      <button className="btn btn-primary mb-2" style={{float: 'right'}} onClick={() => this.props.changeView('cart')}>购物车</button>
      <table className="table">
        <thead className="thead-dark">
        <tr>
          <th scope="col">名称</th>
          <th scope="col">单价</th>
          <th scope="col">优惠信息</th>
          <th scope="col">数量</th>
        </tr>
        </thead>
        <tbody>
        {this.props.allItems.map((item) => {
          return <tr key={item.barcode}>
            <td width="25%">{item.name}</td>
            <td width="25%">{item.price.toFixed(2)}元</td>
            <td width="25%">
              {item.type}
            </td>
            <td width="25%">
              {this.renderEditCount(item, this.props.cartItems)}
            </td>
          </tr>
        })}
        </tbody>
      </table>
    </div>
  }
}

export default ItemList;