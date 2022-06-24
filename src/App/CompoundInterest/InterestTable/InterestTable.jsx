
import React from 'react'; 
import PropTypes from 'prop-types';
import IterestRow from './InterestRow';

const IterestTable = (props) => {
	const rows = [];

	props.interests.forEach((interest, index) => {
        let compoundInterest = props.interests.slice(0, index+1).reduce((tot, curr) => tot * (1 + (parseFloat(curr.regularInterest)/100)),1); 
        compoundInterest = `${((compoundInterest-1)*100).toLocaleString(undefined,{ minimumFractionDigits: 3 })}%`;
		rows.push(
		    <IterestRow key={index} index={index} {...interest} changeRow={props.changeRow} compoundInterest={compoundInterest}>
            </IterestRow>
		);
	});

	return (
		<div className='chilren-container'>
			<table style={{direction:"rtl"}} className="table table-bordered">
				<thead className="thead-light"> 
					<tr>
						<th>חודש</th>
						<th>ריבית (באחוזים)</th>
						<th>ריבית מצטברת</th>
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

IterestTable.propTypes = {
	interests: PropTypes.array.isRequired,
    addRow: PropTypes.func,
    removeRow: PropTypes.func,
    changeRow: PropTypes.func
}

export default IterestTable;
