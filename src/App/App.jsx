import React from 'react'; 
import './App.css';
import { Route, BrowserRouter ,Switch } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import AboutUs from './AboutUs';
import Contact from './Contact';
import InterestCalculator from './InterestCalculator';

class App extends React.Component {

  render() {
		const Container = (props) =>
			<div className="body-container">
				<Header />
				<div className="container"> {props.children} </div>
			</div>

    return (
			<BrowserRouter>
				<Container>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/about" component={AboutUs} />
						<Route path="/contact" component={Contact} />
						<Route path="/calcInterest"  component={InterestCalculator}/>
						<Route path="/calc2"  />
						<Route path="/calc3"  />
						<Route path="*" />
					</Switch>
				</Container>
			</BrowserRouter>
    );
  }
}

export default App;
