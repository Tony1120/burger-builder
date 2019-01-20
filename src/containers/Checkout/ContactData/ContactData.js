import React, {Component}from 'react';
import Button from 'components/UI/Button/Button';

import axios from 'axios-orders'

import Spinner from 'components/UI/Spinner/Spinner'
import classes from './ContactData.module.css'
export default class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		},
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault();	
		console.log(this.props.ingredients);

		this.setState({
			loading: true 
		});
		//alert('Continue!')
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
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
					
				});
				this.props.history.push('/');
			})
			.catch(error => {

				this.setState({
					loading: false,
					
				});
			});
	}


	render() {
		let form = (				
				<form>
					<input className = {classes.Input} type = "text" name = "name" placeholder = "your name" />
					<input className = {classes.Input} type = "eamil" name = "email" placeholder = "your email" />
					<input className = {classes.Input} type = "text" name = "street" placeholder = "your street" />
					<input className = {classes.Input} type = "text" name = "postal" placeholder = "your PostCode" />					
					<Button btnType = "Success" clicked = {this.orderHandler}> ORDER </Button>

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
