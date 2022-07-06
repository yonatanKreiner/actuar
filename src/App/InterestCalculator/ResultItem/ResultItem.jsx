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
		
		const finalDebt = await props.calculateDept();	
		
		setResult(finalDebt);
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
							<h1 id='resultElement'>סה"כ חוב</h1>
							<h1 id='resultElement'>{result.total}</h1>
						</div>
						<button type='button' onClick={() => onClickGeneratePDF()} className='btn btn-outline-info generate-pdf-btn'>הפק דו"ח</button>
						<CSVLink
							data={result.allDepts.map(debt => {
								const startDate = new Date(debt.startDate);
								const endDate = new Date(debt.endDate);
								return ({
									sum: debt.sum,
									isLegalInterest: debt.interestType === 'legal-interest' ? "ריבית צמודה" :
														debt.interestType === 'illegal-interest' ? "ריבית פיגורים" :
														debt.interestType === 'shekel-interest' ? "ריבית שקלית" : "הצמדה למדד",
									startDate: `${startDate.getDate()}/${startDate.getMonth()+1}/${startDate.getFullYear()}`,
									endDate: `${endDate.getDate()}/${endDate.getMonth()+1}/${endDate.getFullYear()}`,
									indexateSum: debt.indexateSum,
									totalInterest: debt.totalInterest,
									totalDebt: debt.totalDebt,
								})
							})}
							headers={[
								{label: "חוב", key: "sum"},
								{label: "סוג ריבית", key: "isLegalInterest"},
								{label: "מתאריך", key: "startDate"},
								{label: "עד תאריך", key: "endDate"},
								{label: "שווי הצמדה", key: "indexateSum"},
								{label: "שווי ריבית", key: "totalInterest"},
								{label: "סך הכל", key: "totalDebt"}
							]}
							filename={"פסיקת ריבית.csv"}
							className="btn btn-outline-info generate-pdf-btn"
							target="_blank"
						>
							ייצא לאקסל
						</CSVLink>
					</div> : <></>
			}
		</div>
		);
}

ResultItem.propTypes = {
	calculateDept: PropTypes.func.isRequired,
	generatePDF: PropTypes.func.isRequired,
}

export default ResultItem;
