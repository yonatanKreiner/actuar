import './DebtRow.css';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DeptRow = (props) => {
	useEffect(() => {
	 
	}, []);

	const onChangeDebtStartDate = (value) => {
		props.handleChangeDebt(props.index, {
			startDate: value,
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

	const onChangeDebtEndDate = (value) => {
		props.handleChangeDebt(props.index, {
			startDate: props.debt.startDate,
			sum: props.debt.sum,
			isLegalInterest: props.debt.isLegalInterest,
			endDate: value
		});
	} 

	return (
		<tr id="debt-row">
			<td>
				<input type='number' className="form-text amoutpicker" onChange={onChangeDebtSum} min='0' value={props.debt.sum} />
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
				<DatePicker selected={new Date(props.debt.startDate)} onChange={onChangeDebtStartDate} dateFormat={"dd/MM/yyyy"} minDate={new Date(1990,1,1)} />
			</td>
			<td>
				<DatePicker selected={new Date(props.debt.endDate)} onChange={onChangeDebtEndDate} dateFormat={"dd/MM/yyyy"} minDate={new Date(1990,1,1)} />
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
