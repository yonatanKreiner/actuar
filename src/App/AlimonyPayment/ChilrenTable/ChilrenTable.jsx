import './ChilrenTable.css';

import React from 'react'; 
import PropTypes from 'prop-types';

import ChildData from './ChildData';

const ChilrenTable = (props) => {
	const rows = [];

	props.children.forEach((child, index) => {
		rows.push(
			<ChildData key={index} index={index} changeChild={props.changeChild} child={child} />
		);
	});

	return (
		<div className='chilren-container'>
			{rows}
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
	removeChild: PropTypes.func.isRequired
}

export default ChilrenTable;
