import React from 'react'; 
import PropTypes from 'prop-types';

 const ResultTable = (props) => {
    const getRowsData = () => {
        return props.records.map(record => (
          <tr>
              <td>{record.FUND_NAME}</td>
              <td>{record.REPORT_PERIOD}</td>
              <td>{record.MONTHLY_YIELD}</td>
          </tr>
        ));
    }

    return (
        <div id="results-table" className='results-table'>
            <table style={{direction:"rtl"}} className="table table-bordered">
                <thead className="thead-light"> 
                    <tr>
                        <th>שם הקרן</th>
                        <th>חודש</th>
                        <th>תשואה</th>
                    </tr>
                </thead>
                <tbody>
                    {getRowsData()}
                </tbody>
            </table>
        </div>
    );
};

ResultTable.propTypes = {
    records: PropTypes.array
}

export default ResultTable;