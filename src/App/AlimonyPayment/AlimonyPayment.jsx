import './AlimonyPayment.css';

import React, {useState} from 'react';
import ChilrenTable from './ChilrenTable';
import ResultItem from './ResultItem';
import GeneralPayload from './GeneralPayload';

const AlimonyPayment = () => {
	const [children, setChildren] = useState([
		{birthDate: '01/01/2005', sum: 1000, adultPrecent: 0.3, gender: 'male'},
	]);
	const [madadIndexateInterval,setMadadIndexateInterval] = useState(3);
	const [startPaymentDate,setStartPaymentDate] = useState('01/01/2020');

	const handleChangeGereral = (madadUpdateInterval, paymentStartDate) => {
		setMadadIndexateInterval(madadUpdateInterval);
		setStartPaymentDate(paymentStartDate);
	}

	const handleChangeChildren = (index, child) => {
		setChildren([...children.slice(0,index), child, ...children.slice(index+1)]);
	}

	const handleAddChild = () => {
		setChildren([...children, {birthDate: '01/01/2000', sum: 1000, adultPrecent: 0.3, gender: 'male'}]);
	}

	const handleRemoveChild = () => {
		setChildren(children.slice(0,-1));
	}

	const handleCalculatePayment = async () => {
		const apiUrl = process.env.NODE_ENV === 'production' ? '/interest/alimonyPayment': 'http://localhost:7000/interest/alimonyPayment';

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
			<div className='data-container'>
				<div className='alimonay-payload-container'>
					<GeneralPayload 
						onChange={handleChangeGereral}
						startDate={startPaymentDate}
						madadIndexateInterval={madadIndexateInterval}
					/>
					<hr/>
					<ChilrenTable  
						changeChild={handleChangeChildren}
						addChild={handleAddChild} 
						removeChild={handleRemoveChild} 
						children={children} />
				</div>
				<ResultItem calculateAlimonyPayment={handleCalculatePayment}></ResultItem>
			</div>
        </div>
    );
}

export default AlimonyPayment;
