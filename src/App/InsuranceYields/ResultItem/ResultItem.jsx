import React, { useState } from 'react'; 
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import ResultsTable from './ResultTable';
import { CSVLink } from "react-csv";

import './ResultItem.css';

 const ResultItem = (props) => {

    const [isLoading, setIsLoading] = useState(false)

    const calculateYieldOnClick = async () => {
        setIsLoading(true);
        await props.handleCalculateYield();
        setIsLoading(false);
    }

    return (
        <div>
            <button type='button' className='btn-result btn btn-primary' onClick={calculateYieldOnClick}>חשב</button>
            {isLoading ? <ReactLoading className="loader yield-calc-loader" color={'#2196F3'} /> : props.result ? 		
                (<div>
                    <h1 id='resultElement'>סה"כ בקרן</h1>
                    <h1 id='resultElement'>{props.result.toLocaleString(undefined,{ minimumFractionDigits: 2 })}</h1>
                    <CSVLink
							data={props.records.map(row => ({
								fund: row.FUND_NAME,
                                date: row.REPORT_PERIOD,
								yield: row.MONTHLY_YIELD
							}))}
							headers={[
								{label:"שם הקרן", key: "fund"},
                                {label:"חודש", key: "date"},
                                {label: "תשואה", key: "yield"}
							]}
							filename={"תשואה.csv"}
							className="yield-calc-export-csv-btn btn-outline-info btn"
							target="_blank"
						>
							ייצא לאקסל
                    </CSVLink>
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