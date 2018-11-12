import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.module.css'

const controls = [
	{label: 'Salad', type: 'salad'},
	{label: 'Bacon', type: 'bacon'},
	{label: 'Cheese', type: 'cheese'},
	{label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
	<div className = {classes.BuildControls}>
		<p> Current Price: {props.price.toFixed(2)}</p>
		{controls.map(ingredient => (
			<BuildControl 
				key = {ingredient.label} 
				label = {ingredient.label}
				added = {() => props.ingredientAdded(ingredient.type)}
				removed = {() => props.ingredientRemoved(ingredient.type)}
				disabled = {props.disabled[ingredient.type]}
			/>
		))}
		 <button 
		 	className = {classes.OrderButton} 
		 	disabled = {!props.purchasable}> Order Now</button>
	</div>
);

export default buildControls;