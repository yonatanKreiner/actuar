import './ChildData.css';

import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

const $ = window.jQuery;

const ChildData = (props) => {
	useEffect(() => {
		let datePickerId = 'datepicker'+ props.index;
		$('#' + datePickerId).datepicker({
			format: 'dd/mm/yyyy'
		});
		$('#' + datePickerId).change(onChangeBirthDate);
	}, []);

	const onChangeBirthDate = (e) => {
		props.changeChild(props.index, {
			birthDate: e.target.value,
			sum: props.child.sum,
			adultPrecent: props.child.adultPrecent,
			gender:props.child.gender
		})
	}

	const onChangeGender = (e) => {
		props.changeChild(props.index, {
			birthDate: props.child.birthDate,
			sum: props.child.sum,
			adultPrecent: props.child.adultPrecent,
			gender: e.target.value
		})
	}
	
	const onChangeAdultPrecent = (e) => {
		props.changeChild(props.index, {
			birthDate: props.child.birthDate,
			sum: props.child.sum,
			adultPrecent: e.target.value,
			gender: props.child.gender
		})
	}

	const onChangeSum = (e) => {
		props.changeChild(props.index, {
			birthDate: props.child.birthDate,
			sum:  e.target.value,
			adultPrecent: props.child.adultPrecent,
			gender: props.child.gender
		})
	}

	return (
		<div className='child-data-container-row'>
			<span className="data-row">
				תאריך לידה: 
				<input id={'datepicker'+props.index} className='datepicker' onChange={onChangeBirthDate} value={props.child.birthDate} />
			</span>
			<span className="data-row">
				סכום מזונות: 
				<input type='number' className="form-text" onChange={onChangeSum} min='0' value={props.child.sum} />
			</span>
			<span className="data-row">
				אחוז שארית (מגיל 18):
				<input type="number" step="0.01" className="form-text" onChange={onChangeAdultPrecent} value={props.child.adultPrecent} />
			</span>
			<span className="data-row data-row-space-even">
				<span className="custom-control custom-radio">
					<input type="radio" className="custom-control-input" 
						 name={"child-gender"+props.index} 
						 id={`male${props.index}`}
						 value="male"
						 onClick={onChangeGender}
						checked={props.child.gender === "male"}
					/>
					<label for={`male${props.index}`} className="custom-control-label">זכר</label>
				</span>
				<span className="custom-control custom-radio">
					<input type="radio" className="custom-control-input" 
						name={"child-gender"+props.index}
						id={`female${props.index}`}
						value="female"
						onClick={onChangeGender}
						checked={props.child.gender === "female"}
					/>
					<label for={`female${props.index}`} className="custom-control-label">נקבה</label>
				</span>
			</span>
		</div>
	);
}

ChildData.propTypes = {
	index: PropTypes.number.isRequired,
	child: PropTypes.object.isRequired,
	changeChild: PropTypes.func.isRequired
};

export default ChildData;
