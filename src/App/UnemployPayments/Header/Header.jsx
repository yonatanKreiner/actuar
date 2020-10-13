import './Header.css';

import React from 'react'; 

const Header = () => (
	<div className="unemploy-container">
		<div className="panel panel-info">
			<div className="panel-heading">
				<h1>מחשבון דמי אבטלה</h1>
			</div>
			<div className="panel-body">
				<p>
					במחשבון זה ניתן לחשב את הערך של דמי האבטלה אשר מגיעים לכם
					<br/>	בהתאם לגיל והמשכורות האחרונות שלכם.
					<br/> (המחשבון עושה שימוש בסכום היומי הבסיסי חישוב קצבאות 352 ש"ח)
				</p>
				<h6>לדמי האבטלה חסם עליון במקרים הבאים:</h6>
				<ul className="extra-details"> 
					<li>		סכום השווה לשכר היומי הממוצע במשק, 422.04 ש"ח, עבור כל יום תשלום - ב-125 ימי התשלום הראשונים.</li>
					<li>סכום השווה לשני שלישים מהשכר היומי הממוצע במשק, 422.04 ש"ח, עבור כל יום תשלום - החל מיום התשלום ה-126 ואילך.</li>
				</ul>
			</div>
		</div>
	</div>
);

export default Header;
