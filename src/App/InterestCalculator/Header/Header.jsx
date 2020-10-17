import './Header.css';

import React from 'react'; 

const Header = () => (
	<div className="panel panel-info">
		<div className="panel-heading">
			<h1>מחשבון ריבית ומדד</h1>
		</div>
		<div className="panel-body">
			<p>
				במחשבון זה ניתן לחשב את הערך של סכום מסוים בתאריכים שונים בהתאם לממד והריבית, לצורך שיערוך חובות
				<br/>	:כדי להשתשמש במחשבון ריבית
				<br/> תבחר את התאריכים והסכומים עבורם הינך רוצה לבצע את החישוב 
				<br/> ואז בחר את תאריך שבו אתה מעוניין לדעת את הערך החדש של הסכום
			</p>
		</div>
	</div>
);

export default Header;
