import React from 'react'; 
import './App.css';
import { Route, BrowserRouter ,Switch } from 'react-router-dom';
import SnackbarProvider from 'react-simple-snackbar'

import Header from './Header';
import Home from './Home';
import AboutUs from './AboutUs';
import Contact from './Contact';
import InterestCalculator from './InterestCalculator';
import AlimonyPayment from './AlimonyPayment';
import InsuranceYields from './InsuranceYields';
import CompoundInterest from './CompoundInterest';
import InterestsTable from './InterestsTable';
import SalaryDetermine from './SalaryDetermine';
import AnnuitiesTable from './AnnuitiesTable';
import AnnuityCalculator from './AnnuityCalculator';

class App extends React.Component {

  render() {
		const Container = (props) =>
			<div className="body-container">
				<Header />
				<div className="container"> {props.children} </div>
			</div>

    return (
			<BrowserRouter>
				<SnackbarProvider>
					<Container>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/about" component={AboutUs} />
							<Route path="/contact" component={Contact} />
							<Route path="/calcInterest"  component={InterestCalculator}/>
							<Route path="/AlimonyPayment" component={AlimonyPayment} />
							<Route path="/InsuranceYields" component={InsuranceYields} />
							<Route path="/CompoundInterest" component={CompoundInterest} />
							<Route path="/InterestsTable" component={InterestsTable} />
							<Route path="/SalaryDetermine" component={SalaryDetermine} />
							<Route path="/AnnuitiesTable" component={AnnuitiesTable} />
							<Route path="/AnnuityCalculator" component={AnnuityCalculator} />
							<Route path="*" />
						</Switch>
					</Container>
				</SnackbarProvider>
			</BrowserRouter>
    );
  }
}

export default App;
