import React from 'react';
import classes from './Burger.module.css'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
const burger = (props) => {
	const ingredientsArray = Object.keys(props.ingredients);
	const transformedIngredients = ingredientsArray.map(igKey => {
		const eachIngredientNumber = props.ingredients[igKey]
		return [...Array(eachIngredientNumber)].map((_, i) => {
			return <BurgerIngredient type = {igKey} key = {igKey + i}/>
		})
	})

	return (
		<div className = {classes.Burger}> 
			<BurgerIngredient type = "bread-top" />
			{transformedIngredients}
			<BurgerIngredient type = "bread-bottom" />

		</div>
		);
};

export default burger;