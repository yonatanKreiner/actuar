import './AlimonyPayment.css';

import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';


import ChilrenTable from './ChilrenTable';
import ResultItem from './ResultItem';
import GeneralPayload from './GeneralPayload';

const AlimonyPayment = () => {
	const history = useHistory();

	const [children, setChildren] = useState([
		{birthDate: new Date(), sum: 1000, adultPrecent: 0.3, gender: 'male'},
	]);
	const [madadIndexateInterval,setMadadIndexateInterval] = useState(3);
	const [startPaymentDate,setStartPaymentDate] = useState(new Date());
	const [calcDate,setCalcDate] = useState(new Date());

	const handleChangeGereral = (paymentStartDate, paymentEndDate, madadUpdateInterval) => {
		setStartPaymentDate(paymentStartDate);
		setCalcDate(paymentEndDate);
		setMadadIndexateInterval(madadUpdateInterval);
	}

	const handleChangeChildren = (index, child) => {
		setChildren([...children.slice(0,index), child, ...children.slice(index+1)]);
	}

	const handleAddChild = () => {
		setChildren([...children, {birthDate: new Date(), sum: 1000, adultPrecent: 0.3, gender: 'male'}]);
	}

	const handleRemoveChild = () => {
		setChildren(children.slice(0,-1));
	}

	const handleCalculatePayment = async () => {
		const apiUrl = process.env.NODE_ENV === 'production' ? '/interest/alimonyPayment': 'http://localhost:7000/interest/alimonyPayment';

		const response = await fetch(apiUrl,{
			method: 'post',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({children,madadIndexateInterval,startPaymentDate,calcDate})
		});

		const data = await response.json();
		
		return data;
	}
	
	const openInterestCalculationwithExitData = (resultTable) => {
		const interestPayload = resultTable.map((result) => ({
			startDate: moment(result.date, 'MM/YYYY').toDate(),
			sum: result.payment,
			endDate: calcDate,
			isLegalInterest: true
		}));
		
		window.sessionStorage.setItem('interestCalculationImportPayload', JSON.stringify(interestPayload));

		history.push('calcInterest?combackCalc=alimonyPayment')
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
						calcDate={calcDate}
					/>
					<hr/>
					<ChilrenTable  
						changeChild={handleChangeChildren}
						addChild={handleAddChild} 
						removeChild={handleRemoveChild} 
						children={children} />
				</div>
				<ResultItem 
					calculateAlimonyPayment={handleCalculatePayment}
					openInterestCalculationwithExitData={openInterestCalculationwithExitData}></ResultItem>
			</div>
        </div>
    );
}

export default AlimonyPayment;
