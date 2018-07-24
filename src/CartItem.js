import React, {PureComponent} from 'react';
import count from './count';

class CartItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: count(this.props.cartItems)
    }
  }

  render() {
    const {data} = this.state
    return <div className="mt-3" style={{overflow: 'hidden'}}>
      <h1>购物车</h1>
      <button className="btn btn-primary mb-2" style={{float: 'right'}} onClick={() => this.props.changeView('itemList')}>商品列表</button>
      <table className="table">
        <thead className="thead-dark">
        <tr>
          <th scope="col">名称</th>
          <th scope="col">数量</th>
          <th scope="col">单价</th>
          <th scope="col">优惠信息</th>
          <th scope="col">小计</th>
        </tr>
        </thead>
        <tbody>
        {data.items.map(item => {
          return <tr key={item.barcode}>
            <td width="20%">{item.name}</td>
            <td width="20%">{item.count + item.unit}</td>
            <td width="20%">{item.price.toFixed(2)}元</td>
            <td width="20%">
              {item.type}
            </td>
            <td width="20%">
              {item.subtotal.toFixed(2)}元
            </td>
          </tr>
        })}
        </tbody>
      </table>
      <div style={{float: 'right'}}>
        <h4>总计：{(data.total - data.saved).toFixed(2)}元</h4>
        <h4>节省：{data.saved.toFixed(2)}元</h4>
      </div>
    </div>
  }
}

export default CartItem;