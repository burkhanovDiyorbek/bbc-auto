import React from "react";
import Websocket from "react-websocket";

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 90,
    };
  }

  handleData(data) {
    let result = JSON.parse(data);
    this.setState({ count: this.state.count + result.movement });
  }

  render() {
    return (
      <div>
        Count: <strong>{this.state.count}</strong>
        <Websocket
          url="ws://bbc.mebel-zakaz.uz/chat/messages/test/"
          onMessage={this.handleData.bind(this)}
        />
      </div>
    );
  }
}

export default ProductDetail;
