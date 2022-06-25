import React, {useState} from 'react';
import RowsTable from './CalculationRows';
import ResultContianer from './ResultContainer';

const MadadIndexateCalculator = () => {
    const [rows, setRows] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        sum: 1000,
    }]);

    const addRow = () => {
        setRows([...rows, {startDate: new Date(),endDate: new Date(),sum: 1000}])
    }
    const removeRow = () => {
        setRows(rows.slice(0,rows.length-1));
    }

    const changeRow = (row, index) => {
        setRows([...rows.slice(0,index),row, ...rows.slice(index+1)]);
    }
    
    const calculateIndexate = async () => {
        console.log(1);
    }

    return (
        <div>
            <h4 id="calc-header">מחשבון הצדמה למדד</h4>
			<br/>
            <hr/>
			<div className='data-container'>
				<div>
                   <RowsTable rows={rows} addRow={addRow} removeRow={removeRow} changeRow={changeRow}></RowsTable>
				</div>
			</div>
            <div>
                <ResultContianer calculateIndexate={calculateIndexate}></ResultContianer>
            </div>
        </div>
    );
}

export default MadadIndexateCalculator;
