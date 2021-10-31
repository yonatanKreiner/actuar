import './DebtRow.css';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const $ = window.jQuery;

const DeptRow = (props) => {
	useEffect(() => {
		let startDatePickerId = 'startDate' + props.index;
		$('#' + startDatePickerId).datepicker({
			format: 'dd/mm/yyyy'
		});

		let endDatePickerId = 'endDate' + props.index;
		$('#' + endDatePickerId).datepicker({
			format: 'dd/mm/yyyy'
		});
	}, []);

	const onChangeDebtStartDate = (e) => {
		props.handleChangeDebt(props.index, {
			startDate:  e.target.value,
			sum: props.debt.sum,
			isLegalInterest: props.debt.isLegalInterest,
			endDate: props.debt.endDate
		});
	}
	
	const onChangeDebtSum = (e) => {
		props.handleChangeDebt(props.index, {
			startDate: props.debt.startDate,
			sum: parseFloat(e.target.value),
			isLegalInterest: props.debt.isLegalInterest,
			endDate: props.debt.endDate	
		});
	}

	const onChangeDebtInterestType = (e) => {
		props.handleChangeDebt(props.index, {
			startDate: props.debt.startDate,
			sum: props.debt.sum,
			isLegalInterest:  (e.target.value === 'true'),
			endDate: props.debt.endDate
		});
	}

	const onChangeDebtEndDate = (e) => {
		props.handleChangeDebt(props.index, {
			startDate: props.debt.startDate,
			sum: props.debt.sum,
			isLegalInterest: props.debt.isLegalInterest,
			endDate: e.target.value
		});
	} 

	return (
		<tr id="debt-row">
			<td>
				<input type='number' className="form-text amoutpicker" onChange={onChangeDebtSum} min='0' defaultValue={props.debt.sum} />
			</td>
			<td>
				<div className='radio-block'>
					<div className="custom-control custom-radio">
						<input type="radio" className="custom-control-input" 
							name={"interest-type"+props.index} 
							id={`legal${props.index}`}
							value={true}
							onClick={onChangeDebtInterestType}
							checked={props.debt.isLegalInterest == true}
						/>
						<label for={`legal${props.index}`} className="custom-control-label">ריבית חוקית</label>
					</div>
					<div className="custom-control custom-radio">
						<input type="radio" className="custom-control-input" 
							name={"interest-type"+props.index}
							id={`illegal${props.index}`}
							value={false}
							onClick={onChangeDebtInterestType}
							checked={props.debt.isLegalInterest != true}
						/>
						<label for={`illegal${props.index}`} className="custom-control-label">ריבית פיגורים</label>
					</div>
				</div>
			</td>
			<td>
				<input id={'startDate' + props.index} className='datepicker' 
					onChange={(e) => onChangeDebtStartDate(e)}
					defaultValue={props.debt.startDate} />
			</td>
			<td>
				<input  id={'endDate'+props.index} className='datepicker' onChange={onChangeDebtEndDate} defaultValue={props.debt.endDate} />
			</td>
			<td>
				{props.debt.indexateSum}
			</td>
			<td>
				{props.debt.totalInterest}
			</td>
			<td>
				{props.debt.totalDebt}
			</td>
		</tr>
		// <div id="debt-row" className='container'>
		// 	<input id={'startDate' + props.index} className='datepicker' 
		// 		onChange={onChangeDebtStartDate}
		// 		value={props.debt.startDate} />

		// 	<input type='number' className="form-text amoutpicker" onChange={onChangeDebtSum} min='0' value={props.debt.sum} />
		
		// 	<div className='radio-block'>
		// 		<div className="custom-control custom-radio">
		// 			<input type="radio" className="custom-control-input" 
		// 				 name={"interest-type"+props.index} 
		// 				 id={`legal${props.index}`}
		// 				 value={true}
		// 				 onClick={onChangeDebtInterestType}
		// 				checked={props.debt.isLegalInterest == true}
		// 			/>
		// 			<label for={`legal${props.index}`} className="custom-control-label">ריבית חוקית</label>
		// 		</div>
		// 		<div className="custom-control custom-radio">
		// 			<input type="radio" className="custom-control-input" 
		// 				name={"interest-type"+props.index}
		// 				id={`illegal${props.index}`}
		// 				value={false}
		// 				onClick={onChangeDebtInterestType}
		// 				checked={props.debt.isLegalInterest != true}
		// 			/>
		// 			<label for={`illegal${props.index}`} className="custom-control-label">ריבית פיגורים</label>
		// 		</div>
		// 	</div>

		// 	<input  id={'endDate'+props.index} className='datepicker' onChange={onChangeDebtEndDate} value={props.debt.endDate} />
		// </div>
	);
}

DeptRow.propTypes = {
	index: PropTypes.number.isRequired,
	debt: PropTypes.object.isRequired,
	handleChangeDebt: PropTypes.func.isRequired
};

export default DeptRow;
