import './ResultItem.css';

import PropTypes from 'prop-types';
import React, {useState} from 'react'; 
import ReactLoading from 'react-loading';

import ResultsTable from './ResultsTable';

export const ResultItem = (props) => {

	const [isLoading, setIsLoading] = useState(false);
	const [result, setResult] = useState(undefined);

	const onClickCalculate = async() => {
		const payments = (await props.calculateAlimonyPayment()).payments;
		console.log(payments);
		setResult(payments);
	};

	return (
		<div className='alimony-payment-result-block'>
			<button type='button' onClick={onClickCalculate} className='btn-result btn btn-primary'>חשב</button><br />
			
			{isLoading ? <ReactLoading className="loader" color={'#2196F3'} height={'5%'} width={'5%'} />
						: result ? <ResultsTable payments={result}></ResultsTable> : <></>}
		</div>
	);
}

ResultItem.propTypes = {
	calculateAlimonyPayment: PropTypes.func.isRequired
}