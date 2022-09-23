import './ResultItem.css';

import PropTypes from 'prop-types';
import React from 'react'; 
import ReactLoading from 'react-loading';
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
							<h1 id='resultElement'>{result}</h1>
						</div>
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
