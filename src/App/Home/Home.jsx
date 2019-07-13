import React, { Component } from 'react'; 
import './Home.css';

class Home extends Component {
  
  render() {
    return (
			<div>
				<h1 className="home-title">שלום!</h1>
				<img src="/images/calculate.jpg" className="img-thumbnail home-img" alt="Cinque Terre" />
				<p className="home-content">תנו לנו לבצע את החישובים המסובכים בשבילכם.</p>
				<p className="home-subcontent">אנחנו נעזור לכם לחסוך זמן וכסף בקלות, תוך בשימוש במחשבונים שלנו.</p>
			</div>
    );
  }
}

export default Home;
