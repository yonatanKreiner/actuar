import React, { Component } from 'react';

import './AboutUs.css';

class AboutUs extends Component {

  render() {
    return (
      <div>
        <h1 className="about-title">אודות</h1>
        <div>
					<p className="about-content"> אקטואר הינו אתר המספק מחשבונים להערכות שווי, תחשיבים ועוד. </p>
					<ul className="about-list">
						<li>	
								<p className="about-listTitle">אופיר אלארט</p>
									<ul className="about-sublist">
										<li>
											<p>בוגר תואר ראשון במדעי המחשב מהמכון הטכנולוגי חולון - 2017</p>
										</li>
										<li>
											<p>משרת כעתודאי בדרגת קצין אקדמאי, בתור תוכניתן ביחידת מצפ&quot;ן</p>
										</li>
									</ul>
						</li>
						<li>	
								<p className="about-listTitle">יונתן קריינר</p>
								<ul className="about-sublist">
										<li>
											<p>משרת בתור תוכניתן במודיעין</p>
										</li>
										<li>
											<p>מייסד ובעלים של ArrowFinds</p>
										</li>
									</ul>
						</li>
					</ul>
				</div>
      </div>
    );
  }
}

export default AboutUs;
