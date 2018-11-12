import React from 'react';
import classes from './Burger.module.css'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
const burger = (props) => {
	const ingredientsStringArray = Object.keys(props.ingredients);
	const unFlattendIngredientsComponentArray = ingredientsStringArray.map(igKey => {
		const ingredientQuantity = props.ingredients[igKey]
		const blankArrayOfLengthN = [...Array(ingredientQuantity)]; // n = eachIngredientNumber 
		//console.log(blankArrayOfLengthN);
		
		return blankArrayOfLengthN.map((_, i) => {
			return <BurgerIngredient type = {igKey} key = {igKey + i}/>
		});
	})

	let ingredientsComponentArray = unFlattendIngredientsComponentArray.reduce((arr,el) => {
		return arr.concat(el);
	},[])



	//console.log(ingredientsComponentArray)
	if (ingredientsComponentArray.length === 0) {
		ingredientsComponentArray = <p> please start adding ingredients! </p>;
	}

	return (
		<div className = {classes.Burger}> 
			<BurgerIngredient type = "bread-top" />
			{ingredientsComponentArray}
			<BurgerIngredient type = "bread-bottom" />

		</div>
		);
};

export default burger;