import React from 'react'; 

import './InsuranceYields.css';
import Payload from './Payload';

 const InsuranceYields = () => {

    const handleCalculateYield = async () => {
		const apiUrl = process.env.NODE_ENV === 'production' ? '/interest/insuranceYield': 'http://localhost:7000/interest/insuranceYield';

		const response = await fetch(apiUrl,{
			method: 'post',
			headers: {"Content-Type": "application/json"},
			credentials: "include",
			body: JSON.stringify({
                    fundId: 69,
                    startDate: '10/10/2020',
                    endDate: '10/10/2020',
                })
		});

		const data = await response.json();

		savePayloadToSessionStorage();
		
		return data;
	}
	

    return (
        <div>
            <h4>מחשבון תשואות ביטוחים</h4>
            <br/>
			<p>
			    מחשבון מבוסס נתוני ביטוח נט, לחישוב תשואות.
			</p>

            <Payload></Payload>
        </div>
    );
};

export default InsuranceYields;