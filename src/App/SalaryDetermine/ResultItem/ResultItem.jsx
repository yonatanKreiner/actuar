import './ResultItem.css';

import PropTypes from 'prop-types';
import React from 'react'; 
import ReactLoading from 'react-loading';
import { CSVLink } from "react-csv";
import { useState } from 'react';

const ResultItem = (props) => {
	const [result, setResult] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const onClickCalculate = async () => {
		setIsLoading(true);
		
		const determineSalary = await props.calculate();	
		
		setResult(determineSalary);
		setIsLoading(false);
	}

	const onClickGeneratePDF = async () => {
		setIsLoading(true);
	
		await props.generatePDF();

		setIsLoading(false);
	}

	return (
		<div className='result-block'>
			<button type='button' onClick={() => onClickCalculate()} className='btn-result btn btn-primary'>חשב</button>
			<br />
			{isLoading ? <ReactLoading className="loader" color={'#2196F3'} /> : 
				result ? 
					<div className="result-data-container">
						<div>
							<h1 id='resultElement'>שכר קובע</h1>
							<h1 id='resultElement'>{result.determineSalary}</h1>
							<br/>
							<h4>ממוצע שלושה חודשים אחרונים: {result.calcResults.lastThreeAvg.toLocaleString(undefined,{ minimumFractionDigits: 2 })}</h4>
							<h4>ממוצע 12 חודשים אחרונים: {result.calcResults.lastTwelthAvg.toLocaleString(undefined,{ minimumFractionDigits: 2 })}</h4>
							<h4>ממוצע 12 חודשים קודמים לכך: {result.calcResults.lastFormerTwelthAvg.toLocaleString(undefined,{ minimumFractionDigits: 2 })}</h4>
						</div>
						<CSVLink
							data={result.salariesSums}
							headers={[
								{label: "תאריך", key: "date"},
								{label: "האם עצמאי", key: "isIndependendWorker"},
								{label: "שכר לפנסיה", key: "sum"},
								{label: "תגמולי עובד", key: "sumEmployee"},
								{label: "תגמולי מעסיק", key: "sumCompany"},
								{label: "סהכ דמי גמולים", key: "totalReturn"},
								{label: "שעור הפרשה", key: "returnPrecOfSalary"},
								{label: "שכר מובטח", key: "monthlyDetermineSalary"},
								{label: "שכר מובטח מוצמד", key: "monthlyDetermineSalaryIndexate"}
							]}
							filename={"שכר קובע.csv"}
							className="btn btn-outline-info generate-pdf-btn"
							target="_blank"
						>
							ייצא לאקסל
						</CSVLink>
						{/* <button type='button' onClick={() => onClickGeneratePDF()} className='btn btn-outline-info generate-pdf-btn'>הפק דו"ח</button> */}
					</div> : <></>
			}
		</div>
		);
}

ResultItem.propTypes = {
	calculate: PropTypes.func.isRequired,
	generatePDF: PropTypes.func,
}

export default ResultItem;
