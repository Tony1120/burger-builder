import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css';

const navigationItems = () => (
	<ul className = {classes.NavigationItems}>
		<NavigationItem link = "/"> Checkout </NavigationItem>
		<NavigationItem link = "/" active> Burger Builder  </NavigationItem>
		
	</ul>

);

export default navigationItems;