import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios-orders';
import Order from 'components/Order/Order';
import withErrorHandler from 'hoc/ErrorHandler';

import * as actions from 'store/actions/index';
import Spinner from 'components/UI/Spinner/Spinner';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    console.log(this.state.orders);

    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = (
        <div>
          {this.props.orders.map(order => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          ))}
        </div>
      );
    }

    return orders;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
