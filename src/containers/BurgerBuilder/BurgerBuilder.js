import React, { Component } from 'react';
import Aux from 'hoc/Aux'


import Burger from 'components/Burger/Burger'
import BuildControls from 'components/Burger/BuildControls/BuildControls'
import Modal from 'components/UI/Modal/Modal';
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary'
import Spinner from 'components/UI/Spinner/Spinner'
import axios from 'axios-orders';
import withErrorHandler from 'hoc/ErrorHandler'


const INGREDIENT_PRICES = {
		salad: 0.3,
		cheese: 0.7,
		meat: 1.0,
		bacon: 0.9
};

class BurgerBuilder extends Component {



	state = {
		ingredients: null,
		totalCost: 4,
		purchasing: false, 
		orderClicked: false,
		loading: false,
		error: false
	}

	componentDidMount () {
		axios.get('https://react-burger-8b91a.firebaseio.com/ingredients')
			.then(response => {
				this.setState({
					ingredients:response.data 
				});
			})
			.catch(error => {
				this.setState({
					error: true
				});
			});
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

	purchaseContinueHandler = () => {
		this.setState({
			loading: true 
		});
		//alert('Continue!')
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalCost,
			customer: {
				name: 'tony',
				address: {
					street: 'xxx'
				},
				email: 'sss@gmail.com'
			}
		}
		axios.post('/orders.json',order)
			.then(response => {
				this.setState({
					loading: false,
					purchasing: false
				});
			})
			.catch(error => {

				this.setState({
					loading: false,
					purchasing: false
				});
			});

	}



	render () {
		const disabledInfo = { ...this.state.ingredients};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;





		let burger = this.state.error? <p>ingredients can't be loaded!</p>: <Spinner />;
		if (this.state.ingredients) {
			burger = (
			<Aux>
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

			orderSummary = 	<OrderSummary 
				ingredients = {this.state.ingredients}
				purchaseCanceled = {this.purchaseCancelHandler}
				purchaseContinued = {this.purchaseContinueHandler}
				price = {this.state.totalCost} />;
		}

		if (this.state.loading) {
			orderSummary = <Spinner />
		}
		

		return (
			<Aux>
				<Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}

			</Aux>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);