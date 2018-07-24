import React, {PureComponent} from 'react';

class ItemList extends PureComponent {

  renderEditCount = (item) => {
    return <div className="input-group mb-3 col-md-6 offset-md-3">
      <div className="input-group-prepend">
        <span className="input-group-text" onClick={() => this.props.onDeleteItemCount(item)}>-</span>
      </div>
      <input type="text" className="form-control" value={item.count}/>
      <div className="input-group-append">
        <span className="input-group-text" onClick={() => this.props.onAddItemCount(item)}>+</span>
      </div>
      <span className="mt-2 ml-2">{item.unit}</span>
    </div>
  }

  render() {
    return <div>
      <table className="table">
        <thead className="thead-dark">
        <tr>
          <th scope="col">名称</th>
          <th scope="col">单价</th>
          <th scope="col">优惠信息</th>
          <th scope="col">个数</th>
        </tr>
        </thead>
        <tbody>
        {this.props.allItems.map((item) => {
          return <tr key={item.barcode}>
            <td width="25%">{item.name}</td>
            <td width="25%">{item.price}元</td>
            <td width="25%">
              {item.type}
            </td>
            <td width="25%">
              {this.renderEditCount(item)}
            </td>
          </tr>
        })}
        </tbody>
      </table>
    </div>
  }
}

export default ItemList;