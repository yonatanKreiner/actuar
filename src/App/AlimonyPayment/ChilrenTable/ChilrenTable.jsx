import './ChilrenTable.css';

import React from 'react'; 
import PropTypes from 'prop-types';

import ChildData from './ChildData';

const ChilrenTable = (props) => {
	const rows = [];

	props.children.forEach((child, index) => {
		rows.push(
			<ChildData key={index} index={index} changeChild={props.changeChild} child={child} startPaymentDate={props.startPaymentDate} />
		);
	});

	return (
		<div className='chilren-container'>
			<table style={{direction:"rtl"}} className="table table-bordered">
				<thead className="thead-light"> 
					<tr>
						<th>שם הילד</th>
						<th>תאריך לידה</th>
						<th>מין</th>
						<th>גיל בעת ההסכם</th>
						<th>גובה דמי מזונות עד גיל 18</th>
						<th>גובה החל מגיל 18 ועד סוף הצבא</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
			<input type='button' className='btn btn-info' onClick={() => {
					props.addChild();
				}} value='הוסף'/>
			<input type='button' className='btn btn-warning' onClick={() => {props.removeChild()}} value='הסר'/>
		</div>
	);
}

ChilrenTable.propTypes = {
	children: PropTypes.array.isRequired,
	changeChild: PropTypes.func.isRequired,
	addChild: PropTypes.func.isRequired,
	removeChild: PropTypes.func.isRequired,
	startPaymentDate: PropTypes.object
}

export default ChilrenTable;
