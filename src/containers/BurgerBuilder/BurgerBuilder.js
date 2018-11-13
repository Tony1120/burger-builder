import React, { Component } from 'react';
import Aux from '../../hoc/Aux'


import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
	
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
const INGREDIENT_PRICES = {
		salad: 0.3,
		cheese: 0.7,
		meat: 1.0,
		bacon: 0.9
};

class BurgerBuilder extends Component {



	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalCost: 4,
		purchasing: false, 
		orderClicked: false
	}

	updatePurchaseState = (ingredients) => {


		const numberSum = Object.keys(ingredients).map(key => {
			return ingredients[key];
		}).reduce((sum,el) => {
			sum += el;
			return sum;
		},0)

		this.setState({
			purchasable: numberSum >  0 
		});
		// console.log(Object.keys(ingredients).map(key => {
		// 	return ingredients[key];
		// }))
		// console.log(numberArray);
	}

	AddIngredientHandler = (type) => {
		const currentNumber = this.state.ingredients[type];
		const newNumber = currentNumber + 1;
		const newIngredients = {...this.state.ingredients};
		newIngredients[type] = newNumber;

		const newTotalPrice = INGREDIENT_PRICES[type] + this.state.totalCost;


		this.setState({
			ingredients: newIngredients,
			totalCost: newTotalPrice 

		});

		this.updatePurchaseState(newIngredients);
	}

	RemoveIngredientHandler = (type) => {
		const currentNumber = this.state.ingredients[type];
		if (currentNumber <= 0) {return;}
		const newNumber = currentNumber - 1;
		const newIngredients = {...this.state.ingredients};
		newIngredients[type] = newNumber;
		const newTotalPrice =  this.state.totalCost - INGREDIENT_PRICES[type];


		this.setState({
			ingredients: newIngredients,
			totalCost: newTotalPrice 

		});

		this.updatePurchaseState(newIngredients);
	}

	purchaseHandler = () => {
		this.setState({
			purchasing: true 
		});
	}

	purchaseCancelHandler = () => {
		this.setState({
			purchasing: false
		});


	}



	render () {
		const disabledInfo = { ...this.state.ingredients};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		return (
			<Aux>
				<Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
					<OrderSummary ingredients = {this.state.ingredients}/>
				</Modal>
				<Burger ingredients = {this.state.ingredients}/>
				<BuildControls 
					ingredientAdded = {this.AddIngredientHandler}
					ingredientRemoved = {this.RemoveIngredientHandler}
					disabled = {disabledInfo}
					price = {this.state.totalCost}
					purchasable = {this.state.purchasable}
					orderClicked = {this.purchaseHandler}
				/> 

			</Aux>
		);
	}
}

export default BurgerBuilder;