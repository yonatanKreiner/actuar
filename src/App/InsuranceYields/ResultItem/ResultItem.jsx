import React from 'react'; 
import PropTypes from 'prop-types';

import './ResultItem.css';
import ResultsTable from './ResultTable';

 const ResultItem = (props) => {

    const calculateYieldOnClick = async () => {
        await props.handleCalculateYield();
    }

    return (
        <div>
            <button type='button' className='btn-result btn btn-primary' onClick={calculateYieldOnClick}>חשב</button>
            {props.result ? 		
                (<div>
                    <h1 id='resultElement'>סה"כ בקרן</h1>
                    <h1 id='resultElement'>{props.result.toLocaleString(undefined,{ minimumFractionDigits: 2 })}</h1>
                    <ResultsTable records={props.records}></ResultsTable>
                </div>):
                <></>}
        </div>
    );
};

ResultItem.propTypes = {
    result: PropTypes.number,
	handleCalculateYield: PropTypes.func.isRequired
}

export default ResultItem;