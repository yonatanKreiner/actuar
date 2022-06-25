
import React from 'react'; 
import PropTypes from 'prop-types';
import Row from './Row';

const RowsTable = (props) => {
	const rows = [];

	props.rows.forEach((row, index) => {
      rows.push(
		    <Row key={index} index={index} {...row} changeRow={props.changeRow}>
            </Row>
		);
	});

	return (
		<div className='chilren-container'>
			<table style={{direction:"rtl"}} className="table table-bordered">
				<thead className="thead-light"> 
					<tr>
						<th>סכום</th>
						<th>מתאריך</th>
						<th>עד תאריך</th>
						<th>שווי הצמדה</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
			<input type='button' className='btn btn-info' onClick={() => {
					props.addRow();
				}} value='הוסף'/>
			<input type='button' className='btn btn-warning' onClick={() => {props.removeRow()}} value='הסר'/>
		</div>
	);
}

RowsTable.propTypes = {
	rows: PropTypes.array.isRequired,
    addRow: PropTypes.func,
    removeRow: PropTypes.func,
    changeRow: PropTypes.func
}

export default RowsTable;
