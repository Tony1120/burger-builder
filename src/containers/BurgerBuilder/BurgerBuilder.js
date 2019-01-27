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
import * as actionTypes from 'store/actions';
const INGREDIENT_PRICES = {
  salad: 0.3,
  cheese: 0.7,
  meat: 1.0,
  bacon: 0.9
};

class BurgerBuilder extends Component {
  state = {
    totalCost: 4,
    purchasing: false,
    orderClicked: false,
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

    this.setState({
      purchasable: numberSum > 0
    });
    // console.log(Object.keys(ingredients).map(key => {
    // 	return ingredients[key];
    // }))
    // console.log(numberArray);
  };

  AddIngredientHandler = type => {
    console.log('haha');
    const currentNumber = this.state.ingredients[type];
    const newNumber = currentNumber + 1;
    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] = newNumber;

    const newTotalPrice = INGREDIENT_PRICES[type] + this.state.totalCost;

    this.setState({
      ingredients: newIngredients,
      totalCost: newTotalPrice
    });

    this.updatePurchaseState(newIngredients);
  };

  RemoveIngredientHandler = type => {
    const currentNumber = this.state.ingredients[type];
    if (currentNumber <= 0) {
      return;
    }
    const newNumber = currentNumber - 1;
    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] = newNumber;
    const newTotalPrice = this.state.totalCost - INGREDIENT_PRICES[type];

    this.setState({
      ingredients: newIngredients,
      totalCost: newTotalPrice
    });

    this.updatePurchaseState(newIngredients);
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
    console.log(this.props);

    const queryParams = [];

    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          '=' +
          encodeURIComponent(this.state.ingredients[i])
      );
    }

    queryParams.push('price=' + this.state.totalCost.toFixed(2));
    console.log(queryParams);
    const querystring = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + querystring
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
    console.log('this.props.ingredients', this.props.ingredients);
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientDeleted}
            disabled={disabledInfo}
            price={this.state.totalCost}
            purchasable={this.state.purchasable}
            orderClicked={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalCost}
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
    ingredients: state.ingredients
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientDeleted: ingName =>
      dispatch({ type: actionTypes.DELETE_INGREDIENT, ingredientName: ingName })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
