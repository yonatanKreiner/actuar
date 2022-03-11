import './AlimonyPayment.css';

import React, {useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';


import ChilrenTable from './ChilrenTable';
import ResultItem from './ResultItem';
import GeneralPayload from './GeneralPayload';

const AlimonyPayment = () => {
	const history = useHistory();

	const [children, setChildren] = useState([
		{name: "ילד 1" , birthDate: new Date(), sum: 1000, adultPrecent: 1/4, gender: 'male'},
	]);
	const [madadIndexateInterval,setMadadIndexateInterval] = useState(3);
	const [aggrimentDate,setAggrimentDate] = useState(new Date());
	const [startPaymentDate,setStartPaymentDate] = useState(new Date().setDate(1));
	const [calcDate,setCalcDate] = useState(new Date().setDate(1));
	const [baseIndexateDate,setBaseIndexateDate] = useState(new Date().setDate(1));
	const [paymentDayInMonth, setPaymentDayInMonth] = useState(10);

	useEffect(() => {
		loadPayloadFromSessionStorage();
	}, []);

	const handleChangeGereral = (aggrimentSignDate, paymentStartDate, paymentEndDate, indexateDate, madadUpdateInterval, monthlyPayDay) => {
		setAggrimentDate(aggrimentSignDate);
		setStartPaymentDate(paymentStartDate);
		setCalcDate(paymentEndDate);
		setBaseIndexateDate(indexateDate);
		setMadadIndexateInterval(madadUpdateInterval);
		setPaymentDayInMonth(monthlyPayDay);
	}

	const handleChangeChildren = (index, child) => {
		setChildren([...children.slice(0,index), child, ...children.slice(index+1)]);
	}

	const handleAddChild = () => {
		setChildren([...children, {name: `ילד ${children.length+1}`, birthDate: new Date(), sum: 1000, adultPrecent: 1/4, gender: 'male'}]);
	}

	const handleRemoveChild = () => {
		setChildren(children.slice(0,-1));
	}

	const handleCalculatePayment = async () => {
		const apiUrl = process.env.NODE_ENV === 'production' ? '/interest/alimonyPayment': 'http://localhost:7000/interest/alimonyPayment';

		const response = await fetch(apiUrl,{
			method: 'post',
			headers: {"Content-Type": "application/json"},
			credentials: "include",
			body: JSON.stringify({children,madadIndexateInterval,startPaymentDate,calcDate, baseIndexateDate, paymentDayInMonth})
		});

		const data = await response.json();

		savePayloadToSessionStorage();
		
		return data;
	}
	
	const openInterestCalculationwithExitData = (resultTable) => {
		const interestPayload = resultTable.map((result) => { 
			const startDate = moment(result.date, 'MM/YYYY').toDate();
			startDate.setDate(1);

			return ({
				startDate: startDate.getTime(),
				sum: result.totalPayment,
				endDate: calcDate,
				isLegalInterest: true
			});
		});
		
		window.sessionStorage.setItem('interestCalculationImportPayload', JSON.stringify(interestPayload));

		history.push('calcInterest?combackCalc=alimonyPayment')
	}

	const savePayloadToSessionStorage =  () => {
		const alimonyPayload = {
			children: children,
			madadIndexateInterval: madadIndexateInterval,
			startPaymentDate: startPaymentDate,
			calcDate: calcDate,
			baseIndexateDate: baseIndexateDate,
			aggrimentDate: aggrimentDate,
			paymentDayInMonth: paymentDayInMonth
		};
		
		window.sessionStorage.setItem('alimonyPamentPayload', JSON.stringify(alimonyPayload));
	}

	const loadPayloadFromSessionStorage = () => {
		const payload = window.sessionStorage.getItem("alimonyPamentPayload");
		if(payload){
			const payloadData = JSON.parse(payload); 
			setChildren(payloadData.children);
			setMadadIndexateInterval(payloadData.madadIndexateInterval);
			setStartPaymentDate(new Date(payloadData.startPaymentDate));
			setCalcDate(new Date(payloadData.calcDate));
			setBaseIndexateDate(new Date(payloadData.baseIndexateDate))
			setAggrimentDate(new Date(payloadData.aggrimentDate));
			setPaymentDayInMonth(payloadData.paymentDayInMonth);
		}
	}

    return (
        <div className='alimony-payment-container'>
            <h4>מחשבון שיערוך חוב מזונות</h4>
			<br/>
			<p>
			מחשבון חוב מזונות זה - הינו לצורך חישוב הסכם דמי מזונות בין בני זוג. <br/>
			על מנת לבצע חישוב כראוי נדרש להקליד את המידע הנכון והרלוונטי כפי הרשום בהסכם המזונות.<br/>
			מחשבון זה יבצע חישוב שווי דמי המזונות כאשר הם צמודים למדד.<br/>
			בהתאם להסכם דמי המזונות, נכון לתקופות זמן רצויות.<br/>
			ניתן לבצע שווי חוב דמי מזונות שלא שולמו ו/או שולמו בחלקן, לפי מחשבון פסיקת ריבית.<br/>
			מחשבון דמי מזונות זה - ניתן כשירות בלבד וכל העושה בו שימוש הינו על פי דעתו בלבד ובאחריותו האישית בלבד<br/>
			אין לבצע שימוש משפטי במחשבון זה.
			</p>
            <hr/>
			<div className='data-container'>
				<div className='alimonay-payload-container'>
					<GeneralPayload 
						onChange={handleChangeGereral}
						startDate={startPaymentDate}
						madadIndexateInterval={madadIndexateInterval}
						calcDate={calcDate}
						baseIndexateDate={baseIndexateDate}
						aggrimentDate={aggrimentDate}
						paymentDayInMonth={paymentDayInMonth}
					/>
					<hr/>
					<ChilrenTable  
						changeChild={handleChangeChildren}
						addChild={handleAddChild} 
						removeChild={handleRemoveChild} 
						children={children} 
						startPaymentDate={startPaymentDate}/>
				</div>
				<ResultItem 
					calculateAlimonyPayment={handleCalculatePayment}
					openInterestCalculationwithExitData={openInterestCalculationwithExitData}
					children={children}></ResultItem>
			</div>
        </div>
    );
}

export default AlimonyPayment;
