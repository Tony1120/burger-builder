import React, { Component } from 'react';
import Aux from 'hoc/Aux';

import Burger from 'components/Burger/Burger';
import BuildControls from 'components/Burger/BuildControls/BuildControls';
import Modal from 'components/UI/Modal/Modal';
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary';
import Spinner from 'components/UI/Spinner/Spinner';
import axios from 'axios-orders';
import withErrorHandler from 'hoc/ErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderActions from 'store/actions/index';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  //   componentDidMount() {
  //     axios
  //       .get('https://react-burger-8b91a.firebaseio.com/ingredients.json')
  //       .then(response => {
  //         this.setState({
  //           ingredients: response.data
  //         });
  //       })
  //       .catch(error => {
  //         this.setState({
  //           error: true
  //         });
  //       });
  //   }

  updatePurchaseState = ingredients => {
    const numberSum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        sum += el;
        return sum;
      }, 0);
    return numberSum > 0;
    // console.log(Object.keys(ingredients).map(key => {
    // 	return ingredients[key];
    // }))
    // console.log(numberArray);
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  purchaseContinueHandler = () => {
    this.props.history.push({
      pathname: '/checkout'
    });
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? (
      <p>ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientDeleted}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            orderClicked={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      console.log('this.state.loading', this.state.loading);
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => {
      console.log(
        'burgerBuilderActions.addIngredient',
        burgerBuilderActions.addIngredient
      );
      dispatch(burgerBuilderActions.addIngredient(ingName));
    },
    onIngredientDeleted: ingName =>
      dispatch(burgerBuilderActions.removeIngredient(ingName))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
