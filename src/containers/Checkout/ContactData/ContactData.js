import React, {Component}from 'react';
import Button from 'components/UI/Button/Button';

import axios from 'axios-orders'

import Spinner from 'components/UI/Spinner/Spinner'
import classes from './ContactData.module.css'
import Input from 'components/UI/Input/Input'

export default class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'your Name'
				},
				value: '',
				validation: {
					required: true

				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip Code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 6

				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'your E-mail'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest',displayValue: 'Fastest'},
						{value: 'cheapest',displayValue: 'Cheapest'},
					]
				},
				validation: {},
				valid: true,
				value: 'fastest'
			}
		},
		formIsValid: false,
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault();	
		const formData = {};
		for (let formElementidentifier in this.state.orderForm) {
			formData[formElementidentifier] = this.state.orderForm[formElementidentifier].value;
		}
		this.setState({
			loading: true 
		});
		//alert('Continue!')
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData


		}
		axios.post('/orders.json',order)
			.then(response => {
				this.setState({
					loading: false,
					
				});
				this.props.history.push('/');
			})
			.catch(error => {

				this.setState({
					loading: false,
					
				});
			});
	}


	checkValidity(value, rules) {
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.minLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		return isValid
	}

	inputChangedHandler = (event, inputIdentifier	) => {
		const updatedOrderForm = {
			...this.state.orderForm
		};

		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier]
		};

		
		updatedFormElement.value = event.target.value;
		updatedFormElement.touched = true;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedOrderForm[inputIdentifier] = updatedFormElement;
		

		let formIsValid = true;

		for (let inputIdentifier in updatedOrderForm) {

			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
		}


		this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
	}


	render() {
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}
		let form = (				
				<form onSubmit = {this.orderHandler}>
					{formElementsArray.map(formElement => (
						<Input 

							touched = {formElement.config.touched}
							key = {formElement.id}
							elementType = {formElement.config.elementType} 
							elementConfig = {formElement.config.elementConfig} 
							value = {formElement.config.value}
							changed = {(event) => this.inputChangedHandler(event, formElement.id)} 
							invalid = {!formElement.config.valid}
							shouldValidate = {formElement.config.validation}
							/>

						))}				
					<Button btnType = "Success" disabled = {!this.state.formIsValid}> ORDER </Button>
				</form> );

		if (this.state.loading) {
			form = <Spinner/>;
		}

		return (
			<div className = {classes.ContactData}>
				<h4> Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}
