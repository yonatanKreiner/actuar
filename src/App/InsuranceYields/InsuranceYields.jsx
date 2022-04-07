import React, { useState } from 'react'; 

import './InsuranceYields.css';
import Payload from './Payload';
import ResultItem from './ResultItem';

 const InsuranceYields = () => {

	const [fundId, setFundId] = useState(undefined);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [sum, setSum] = useState(0);
	const [result, setResult] = useState(undefined);
	const [records, setRecords] = useState([]);
	const [yieldType, setYieldType] = useState("insurance");

	const updatePayload = (fund_id, start_date, end_date, sum_value, yield_type) => {
		setFundId(fund_id);
		setStartDate(start_date);
		setEndDate(end_date);
		setSum(sum_value);
		setYieldType(yield_type);
	} 

    const handleCalculateYield = async () => {
		let path = "/interest/insuranceYield";
		if(yieldType == "insurance"){
			path = "/interest/insuranceYield";
		}else if(yieldType == "provident"){
			path = "/interest/providentFundYield";
		}else if(yieldType == "pension"){
			path = "/interest/pensionYield";
		}

		const apiUrl = process.env.NODE_ENV === 'production' ? path : `http://localhost:7000${path}`;

		const response = await fetch(apiUrl,{
			method: 'post',
			headers: {"Content-Type": "application/json"},
			credentials: "include",
			body: JSON.stringify({
                    fundId: fundId,
                    startDate: startDate,
                    endDate: endDate,
					sum: sum
			})
		});

		const data = await response.json();
		console.log(data);		

		setResult(parseFloat(data.result.totalYield) * sum);
		setRecords(data.result.records);

		return data;
	}
	

    return (
        <div>
            <h4>מחשבון תשואות</h4>
            <br/>
			<p>
מחשבון מבוסס נתוני ביטוח נט, גמל נט פנסיה נט לחישוב תשואות של רכיבים פיננסים.<br/>
במחשבון קיימים נתוני קרנות ביטוח מ1.1.2019<br/>
במחשבון קיימים נתוני קופות גמל מ1.1.2019<br/>
במחשבון קיימים נתוני קרנות פנסיה מ1.1.2011 <br/>
המחשבון יחשב את את יתרת הקרן בהתאם לסכום התחלה תאריך התחלה ומועד חישוב
			</p>

            <Payload 
				fundId={fundId}
				startDate={startDate}
				endDate={endDate}
				sum={sum}
				yieldType={yieldType}
				updatePayload={updatePayload}></Payload>
			<ResultItem handleCalculateYield={handleCalculateYield} result={result} records={records}></ResultItem>
        </div>
    );
};

export default InsuranceYields;