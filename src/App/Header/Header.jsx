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
					<NavLink activeClassName="activeLink" exact to="/about"> אודות </NavLink>
					<NavLink activeClassName="activeLink" exact to="/contact"> צור קשר </NavLink>
					<div className="dropdown">
						<NavLink activeClassName="activeLink" to="/calc*" disabled> מחשבונים </NavLink>
						<div className="dropdown-content">
							<NavLink activeClassName="activeLink" exact to="/calcInterest">שיערוך חובות</NavLink>
							<NavLink activeClassName="activeLink" exact to="/AlimonyPayment">דמי מזונות</NavLink>
							{/* <NavLink activeClassName="activeLink" exact to="/unemployPayments">דמי אבטלה</NavLink>
							<NavLink activeClassName="activeLink" exact to="/SeverancePay">פיצויי פיטורים</NavLink> */}
						</div>
              		</div>
          		</div>
			</div>          
		</nav>
    );
  }
}

export default withRouter(Header);
