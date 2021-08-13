import './ResultItem.css';

import PropTypes from 'prop-types';
import React, {useState} from 'react'; 
import ReactLoading from 'react-loading';

export const ResultItem = (props) => {

	const [isLoading, setIsLoading] = useState(false);
	const [result, setResult] = useState(0);

	const onClickCalculate = async() => {
		const result = props.calculateAlimonyPayment();
		console.log(result);
	};

	return (
		<div className='alimony-payment-result-block'>
			<div className='row'>
				<button type='button' onClick={onClickCalculate} className='btn-result btn btn-primary'>חשב</button><br />
			</div>
			{isLoading ? <ReactLoading className="loader" color={'#2196F3'} height={'5%'} width={'5%'} /> : 
			<h1 id='resultElement'>{result}</h1>}
		</div>
	);
}

ResultItem.propTypes = {
	calculateAlimonyPayment: PropTypes.func.isRequired
}