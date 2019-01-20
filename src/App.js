import React, { Component } from 'react';

import Layout from 'containers/Layout/Layout'; 
import BurgerBuilder from 'containers/BurgerBuilder/BurgerBuilder'
import Checkout from 'containers/Checkout/Checkout'
import {BrowserRouter,Route} from 'react-router-dom'
class App extends Component {
  render() {
    return (
	    <BrowserRouter>
	      <div>
	        <Layout>
	        	
	        	<Route path = "/checkout"  component = {Checkout} />
	        	<Route path = "/" exact component = {BurgerBuilder} />
	          	
	          
	        </Layout>
	      </div>
	    </BrowserRouter>
    );
  }
}

export default App;

