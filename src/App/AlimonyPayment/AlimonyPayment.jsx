import './AlimonyPayment.css';

import React, {useEffect, useState} from 'react';
import ChilrenTable from './ChilrenTable';
import { ResultItem } from './ResultItem/ResultItem';

const AlimonyPayment = () => {
	const [children, setChildren] = useState([
		{birthDate: '25/2/1999', sum: 1000, adultPrecent: 0.3, gender: 'male'},
	]);
	const [madadIndexateInterval,setMadadIndexateInterval] = useState(3);
	const [startPaymentDate,setStartPaymentDate] = useState(Date.now);


	const handleChange = (index, child) => {
		setChildren([...children.slice(0,index), child, ...children.slice(index+1)]);
	}

	const handleAddChild = () => {
		setChildren([...children, {birthDate: '01/01/2000', sum: 1000, adultPrecent: 0.3, gender: 'male'}]);
	}

	const handleRemoveChild = () => {
		setChildren(children.slice(0,-1));
	}

	const handleCalculatePayment = async () => {
		const apiUrl = process.env.NODE_ENV === 'production' ? '/interest': 'http://localhost:7000/interest/alimonyPayment';

		const response = await fetch(apiUrl,{
			method: 'post',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({children,madadIndexateInterval,startPaymentDate})
		});

		const data = await response.json();
		
		return data;
	}

    return (
        <div className='alimony-payment-container'>
            חישוב דמי מזונות

            <hr/>
			<ChilrenTable  
				changeChild={handleChange}
				addChild={handleAddChild} 
				removeChild={handleRemoveChild} 
				children={children} />
			<hr/>
			<ResultItem calculateAlimonyPayment={handleCalculatePayment}></ResultItem>
        </div>
    );
}

export default AlimonyPayment;
