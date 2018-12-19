import React, {Component} from 'react';

import Aux from 'hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
	state = {
		showSideDrawer: false
	}
	sideDrawerClosedhandler = () => {
		this.setState({showSideDrawer: false});
	}

	sideDrawerOpenhandler = () => {
		this.setState((prevState) => {
			return { showSideDrawer: !prevState.showSideDrawer};
		});
	}

	render () {
		return 	(
			<Aux>
				<Toolbar 
					drawerToggleClicked = {this.sideDrawerOpenhandler}
				/>
				<SideDrawer 
					open= {this.state.showSideDrawer}
					closed = {this.sideDrawerClosedhandler}/>
				<main className = {classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		);		
	}
} 
export default Layout;