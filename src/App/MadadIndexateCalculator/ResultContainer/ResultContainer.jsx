import React, {useState} from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

const ResultContianer = (props) => {
    const [isLoading, setIsLoading] = useState(false);

	const onClickCalculate = async() => {
		setIsLoading(true);
        await props.calculateIndexate()
		setIsLoading(false);
	};
    
    return (
        <div>
            <button type='button' onClick={onClickCalculate} className='btn-result btn btn-primary'>חשב</button>
            {isLoading ? <ReactLoading style={{margin: 'auto'}} color={'#2196F3'} /> : <></>}
        </div>
    );
}

ResultContianer.propTypes = {
    calculateIndexate: PropTypes.func
}

export default ResultContianer;
