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


	const updatePayload = (fund_id, start_date, end_date, sum_value) => {
		setFundId(fund_id);
		setStartDate(start_date);
		setEndDate(end_date);
		setSum(sum_value);
	} 

    const handleCalculateYield = async () => {
		const apiUrl = process.env.NODE_ENV === 'production' ? '/interest/insuranceYield': 'http://localhost:7000/interest/insuranceYield';

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
            <h4>מחשבון תשואות ביטוחים</h4>
            <br/>
			<p>
			    מחשבון מבוסס נתוני ביטוח נט, לחישוב תשואות.
			</p>

            <Payload 
				fundId={fundId}
				startDate={startDate}
				endDate={endDate}
				sum={sum}
				updatePayload={updatePayload}></Payload>
			<ResultItem handleCalculateYield={handleCalculateYield} result={result} records={records}></ResultItem>
        </div>
    );
};

export default InsuranceYields;