import './Header.css';

import React from 'react'; 

const Header = () => (
	<div className="severnace-pay-contaner">
		<div className="panel panel-info">
			<div className="panel-heading">
				<h1>מחשבון פיצויי פיטורים</h1>
			</div>
			<div className="panel-body">
				<p>
					במחשבון זה ניתן לחשב את הערך של פיצויי הפיטורים אשר מגיעים לכם
					<br/>	בהתאם לשכר ולתקופת העסקתכם.
					<br/> (ערכם של הפיצויים הוא ⅓8 מהשכר החודשי עבור על חודש עבודה כולל הפרשה לביטוח פנסיוני)
				</p>
			</div>
			<ul className="extra-details"> 
				<li>במקרה שהעובד משתכר על בסיס יומי ומספר ימי העבודה שלו משתנה, הפיצויים יחושבו לפי מספר ימי העבודה הממוצע כפול שכר העבודה היומי האחרון.</li>
				<li> במקרה שעובד משתכר על בסיס שעתי ושעות העבודה משתנות יש לחשב את הפיצויים לפי היקף המשרה הממוצע כפול שכר השעה האחרון.</li>
			</ul>
		</div>
	</div>
);

export default Header;
