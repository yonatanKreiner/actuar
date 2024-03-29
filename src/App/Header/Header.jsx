import React, { Component } from 'react'; 
import { NavLink, withRouter } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  render() {
    return (
		<nav className="navbar">
			<div className="container">
				<h1 className="logo"><NavLink exact to="/"><img src="/images/logo.png" className="rounded-circle" alt="Cinque Terre"/> אקטוארית </NavLink></h1>
				<div className="nav nav-right">
					<NavLink activeClassName="activeLink" exact to="/"> ראשי </NavLink>
					{/* <NavLink activeClassName="activeLink" exact to="/about"> אודות </NavLink> */}
					<NavLink activeClassName="activeLink" exact to="/contact"> צור קשר </NavLink>
					<div className="dropdown">
						<NavLink activeClassName="activeLink" to="/calc*" disabled> מחשבונים </NavLink>
						<div className="dropdown-content">
							<NavLink activeClassName="activeLink" exact to="/calcInterest">מחשבון פסיקת ריבית</NavLink>
							<NavLink activeClassName="activeLink" exact to="/CompoundInterest">מחשבון ריבית דריבית</NavLink>
							<NavLink activeClassName="activeLink" exact to="/AlimonyPayment">מחשבון חוב מזונות</NavLink>
							<NavLink activeClassName="activeLink" exact to="/InsuranceYields">מחשבון תשואות</NavLink>
							<NavLink activeClassName="activeLink" exact to="/SalaryDetermine">מחשבון שכר קובע</NavLink>
							<NavLink activeClassName="activeLink" exact to="/AnnuityCalculator">מחשבון הפקדות לקצבה מוכרת</NavLink>
						</div>
					</div>
					<div className="dropdown">
						<NavLink activeClassName="activeLink" to="/tables*" disabled> טבלאות עזר </NavLink>
						<div className="dropdown-content">
							<NavLink activeClassName="activeLink" exact to="/InterestsTable">טבלאות ריבית</NavLink>
							<NavLink activeClassName="activeLink" exact to="/AnnuitiesTable">טבלאות עזר קצבאות</NavLink>
						</div>
              		</div>
          		</div>
			</div>          
		</nav>
    );
  }
}

export default withRouter(Header);
