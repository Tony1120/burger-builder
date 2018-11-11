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
		{controls.map(ingredient => (
			<BuildControl 
				key = {ingredient.label} 
				label = {ingredient.label}
				added = {() => props.ingredientAdded(ingredient.type)}
			/>

		))}
	</div>
);

export default buildControls;