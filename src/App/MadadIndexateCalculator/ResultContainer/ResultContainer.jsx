import React, {useState} from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

import './ResultContainer.css';

const ResultContianer = (props) => {
    const [isLoading, setIsLoading] = useState(false);

	const onClickCalculate = async() => {
		setIsLoading(true);
        await props.calculateIndexate()
		setIsLoading(false);
	};
    
    return (
        <div className='madad-indexate-calc-result'>
            <button type='button' onClick={onClickCalculate} className='btn-result btn btn-primary'>חשב</button>
            <ReactLoading className="loader" color={'#2196F3'} />
            {isLoading ? <ReactLoading style={{margin: 'auto'}} className="loader" color={'#2196F3'} /> : <></>}
        </div>
    );
}

ResultContianer.propTypes = {
    calculateIndexate: PropTypes.func
}

export default ResultContianer;
