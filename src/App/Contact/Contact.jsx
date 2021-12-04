import React, { Component } from 'react';

import './Contact.css';

class Contact extends Component {

    render() {
        return (
            <div>
                <h1 className="contact-title">צור קשר</h1>
				<div>
					<ul className="contacts-list">
						<li>	
								<p className="contact-content">אבי יחזקאל - <a href="mailto:avi@actuar.co.il">Avi@actuar.co.il</a></p>
						</li>
					</ul>
					<img src="../../../images/contact.jpg" className="img-thumbnail contact-img" alt="Cinque Terre" />
				</div>
            </div>
        );
    }
}

export default Contact;
