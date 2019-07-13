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
												<p className="contact-content"> אופיר אלארט - 96ofir11@gmail.com  </p>
										</li>
										<li>	
												<p className="contact-content">יונתן קריינר - yonatankreiner@gmail.com</p>
										</li>
									</ul>
									<img src="../../../images/contact.jpg" className="img-thumbnail contact-img" alt="Cinque Terre" />
								</div>
            </div>
        );
    }
}

export default Contact;
