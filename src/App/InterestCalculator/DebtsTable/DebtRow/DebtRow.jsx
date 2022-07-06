import './DebtRow.css';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'react-simple-snackbar'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DeptRow = (props) => {

	const [openSnackbar] = useSnackbar();
    const MIN_DATE = new Date(1990,0,1);

	useEffect(() => {
	 
	}, []);

    const getValidDate = (date) => {
        let validDate = date;
        if(validDate < MIN_DATE) {
            openSnackbar('במערכת ניתן לחשב הסכמים החל מ01/01/1990');
            validDate = MIN_DATE;
        }

        return validDate;
    }

	const onChangeDebtStartDate = (value) => {
		props.handleChangeDebt(props.index, {
			startDate: getValidDate(value),
			sum: props.debt.sum,
			interestType: props.debt.interestType,
			endDate: props.debt.endDate
		});
	}
	
	const onChangeDebtSum = (e) => {
		props.handleChangeDebt(props.index, {
			startDate: props.debt.startDate,
			sum: parseFloat(e.target.value),
			interestType: props.debt.interestType,
			endDate: props.debt.endDate	
		});
	}

	const onChangeDebtInterestType = (e) => {
		props.handleChangeDebt(props.index, {
			startDate: props.debt.startDate,
			sum: props.debt.sum,
			interestType: e.target.value,
			endDate: props.debt.endDate
		});
	}

	const onChangeDebtEndDate = (value) => {
		props.handleChangeDebt(props.index, {
			startDate: props.debt.startDate,
			sum: props.debt.sum,
			interestType: props.debt.interestType,
			endDate: getValidDate(value)
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
							value={'legal-interest'}
							onClick={onChangeDebtInterestType}
							checked={props.debt.interestType === 'legal-interest'}
						/>
						<label for={`legal${props.index}`} className="custom-control-label">ריבית צמודה</label>
					</div>
					<div className="custom-control custom-radio">
						<input type="radio" className="custom-control-input" 
							name={"interest-type"+props.index}
							id={`illegal${props.index}`}
							value={'illegal-interest'}
							onClick={onChangeDebtInterestType}
							checked={props.debt.interestType === 'illegal-interest'}
						/>
						<label for={`illegal${props.index}`} className="custom-control-label">ריבית פיגורים</label>
					</div>
					<div className="custom-control custom-radio">
						<input type="radio" className="custom-control-input" 
							name={"interest-type"+props.index} 
							id={`shekelInterest${props.index}`}
							value={'shekel-interest'}
							onClick={onChangeDebtInterestType}
							checked={props.debt.interestType === 'shekel-interest'}
						/>
						<label for={`shekelInterest${props.index}`} className="custom-control-label">ריבית שקלית</label>
					</div>
					<div className="custom-control custom-radio">
						<input type="radio" className="custom-control-input" 
							name={"interest-type"+props.index} 
							id={`indexateOnly${props.index}`}
							value={'indexate-only'}
							onClick={onChangeDebtInterestType}
							checked={props.debt.interestType === 'indexate-only'}
						/>
						<label for={`indexateOnly${props.index}`} className="custom-control-label">הצמדה למדד</label>
					</div>
				</div>
			</td>
			<td>
				<DatePicker selected={new Date(props.debt.startDate)} onChange={onChangeDebtStartDate} dateFormat={"dd/MM/yyyy"} />
			</td>
			<td>
				<DatePicker selected={new Date(props.debt.endDate)} onChange={onChangeDebtEndDate} dateFormat={"dd/MM/yyyy"} />
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
