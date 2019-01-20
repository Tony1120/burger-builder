import React from 'react';

import Button from 'components/UI/Button/Button';
import classes from './CheckoutSummary.module.css';
import Burger from 'components/Burger/Burger'
const CheckoutSummary = (props) => {
  return (
    <div className = {classes.CheckoutSummary} >
    	<div sytle={{width:'100%', height:'300px', margin: 'auto'}}>
        


    		<Burger ingredients = {props.ingredients} />
    	</div>
    	<Button 
    		btnType = "Danger"
    		clicked = {props.cancelHandler}> Cancel </Button>
    	<Button 
    		btnType = "Success"
    		clicked = {props.continueHandler}> Continue </Button>


    </div>
  )
}

export default CheckoutSummary;