import React from 'react';
import Logo from 'components/Logo/Logo'
import NavigationItems from 'components/Navigation/NavigationItems/NavigationItems';
import classes from './Toolbar.module.css';
import DrawerToggle from 'components/Navigation/SideDrawer/DrawerToggle/DrawerToggle.js'
const toolbar = (props) => (
	<header className = {classes.Toolbar}>
		<DrawerToggle clicked = {props.drawerToggleClicked}/>

		<div className = {classes.Logo} > 
			<Logo />
    	</div>
		<nav className = {classes.DesktopOnly}>
			<NavigationItems />
		</nav>

	</header>
)

export default toolbar;