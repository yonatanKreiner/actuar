import './ResultItem.css';

import PropTypes from 'prop-types';
import React, {useState} from 'react'; 
import ReactLoading from 'react-loading';

import ResultsTable from './ResultsTable';

const ResultItem = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [result, setResult] = useState(undefined);

	const onClickCalculate = async() => {
		setIsLoading(true);

		const payments = (await props.calculateAlimonyPayment()).payments;
		console.log(payments);
		setResult(payments);

		setIsLoading(false);
	};

	const openInterestCalculator = () => {
		props.openInterestCalculationwithExitData(result);
	}

	return (
		<div className='alimony-payment-result-block'>
			<span className="results-functions-container">
				<button type='button' onClick={onClickCalculate} className='btn-result btn btn-primary'>חשב</button>
				{result ? <button type='button' onClick={openInterestCalculator} className='btn-open-interest btn btn-outline-info'>חשב הצמדה וריבית חוקית</button> : <></>}
			</span>
			{isLoading ? <ReactLoading className="loader" color={'#2196F3'} />
						: result ? <ResultsTable payments={result} children={props.children}></ResultsTable> : <></>}
		</div>
	);
}

ResultItem.propTypes = {
	calculateAlimonyPayment: PropTypes.func.isRequired,
	openInterestCalculationwithExitData: PropTypes.func,
	children: PropTypes.array
}


export default ResultItem;