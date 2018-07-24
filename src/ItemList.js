import React, {PureComponent} from 'react';

class ItemList extends PureComponent {
  render() {
    return <div>
      {this.props.allItems.map((item, index) => {
        return <div key={index}>
          {item.name}
        </div>
      })}
    </div>
  }
}

export default ItemList;