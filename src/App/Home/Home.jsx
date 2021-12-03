import React, { Component } from 'react'; 
import './Home.css';

class Home extends Component {
  
  render() {
    return (
			<div>
				<h1 className="home-title">אקטוארית</h1>
				<img src="/images/calculate.jpg" className="img-thumbnail home-img" alt="Cinque Terre" />
				<div>
					<p className="home-content">
						הינה מערכת מחשבונים מובילה בתחום הכלכלה,<br/>
						והמשפט בתחום הכלכלי משפחתי.<br/>
						אקטוארית נועדה לחשב חובות ו/או זכויות מהעבר<br/>
						בהתאם להנחות כלכליות ובהתאמה למערכת המשפטית.<br/>
						מטרת המחשבונים הינה לצורך בדיקה מקדימה של חישובי חובות/זכויות<br/>
						ואין לבצע בה שימוש משפטי.<br/>
					</p>
					<p className="home-subcontent">אקטוארית נבנתה ע"י צוות אקטואר אבי יחזקאל, שניתן להתרשם באתר &nbsp;
					<a href="https://actuar.co.il" target="_blank">Actuar.co.il</a></p><br/>
					<p>&copy;<a href="http://actuarit.co.il" target="_blank">actuarit.co.il</a></p>
				</div>
			</div>
    );
  }
}

export default Home;
