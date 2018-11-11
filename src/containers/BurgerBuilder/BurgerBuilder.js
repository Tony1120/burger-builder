import React, { Component } from 'react';
import Aux from '../../hoc/Aux'


import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
	

const INGREDIENT_PRICES = {
		salad: 0.3,
		cheese: 0.7,
		meet: 1.0,
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
		totalCost: 4 
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
	}

	RemoveIngredient = () => {

	}



	render () {
		return (
			<Aux>
				<Burger ingredients = {this.state.ingredients}/>
				<BuildControls ingredientAdded = {this.AddIngredientHandler}/> 

			</Aux>
		);
	}
}

export default BurgerBuilder;