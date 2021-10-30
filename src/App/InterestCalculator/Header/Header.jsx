import './Header.css';

import React from 'react'; 

const Header = () => (
	<div className="panel panel-info">
		<div className="panel-heading">
			<h1  id="interest-header">חישוב לפי חוק פסיקת ריבית</h1>
		</div>
		<div className="panel-body">
			<p>
				מחשבון זה נועד לחשב חוב בחסות לחוק פסיקת ריבית, ולפי סוג הריבית המחושבת<br/>
				טבלת ריבית כפי  שמפורסם ע"י החשכ"ל<br/>
				להלן נתונים הנדרשים לביצוע התחשיב<br/>
				(sum, date עם שתי עמודות) CSV באפשרותך לייבא את הנתונים באמצעות קובץ<br/>
				:או להכניס את נתוני התחשיב ישירות בטופס המקוון הבא
			</p>
		</div>
	</div>
);

export default Header;
