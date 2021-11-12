import './ChildData.css';

import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ChildData = (props) => {
	useEffect(() => {
	
	}, []);

	const onChangeName = (e) => {
		props.changeChild(props.index, {
			name: e.target.value,
			birthDate: props.child.birthDate,
			sum: props.child.sum,
			adultPrecent: props.child.adultPrecent,
			gender:props.child.gender
		})
	}

	const onChangeBirthDate = (value) => {
		props.changeChild(props.index, {
			name: props.child.name,
			birthDate: value,
			sum: props.child.sum,
			adultPrecent: props.child.adultPrecent,
			gender:props.child.gender
		})
	}

	const onChangeGender = (e) => {
		props.changeChild(props.index, {
			name: props.child.name,
			birthDate: props.child.birthDate,
			sum: props.child.sum,
			adultPrecent: props.child.adultPrecent,
			gender: e.target.value
		})
	}
	
	const onChangeAdultPrecent = (e) => {
		props.changeChild(props.index, {
			name: props.child.name,
			birthDate: props.child.birthDate,
			sum: props.child.sum,
			adultPrecent: parseFloat(e.target.value),
			gender: props.child.gender
		})
	}

	const onChangeSum = (e) => {
		props.changeChild(props.index, {
			name: props.child.name,
			birthDate: props.child.birthDate,
			sum:  parseInt(e.target.value),
			adultPrecent: props.child.adultPrecent,
			gender: props.child.gender
		})
	}

	const calcAge = () => {
		const ageDifMS = props.startPaymentDate - props.child.birthDate;
		const ageDate = new Date(ageDifMS);
		return Math.abs(ageDate.getUTCFullYear() - 1970) + parseFloat((ageDate.getUTCMonth()/12).toFixed(1));
	}

	return (
		<tr className="child-data-container-row">
			<td>
				<input type='text' className="form-text" onChange={onChangeSum} value={props.child.name} />
			</td>
			<td>
				<DatePicker selected={new Date(props.child.birthDate)} onChange={onChangeBirthDate} dateFormat={"dd/MM/yyyy"} />
			</td>
			<td>
				<div className='radio-block'>
					<div className="custom-control custom-radio">
						<input type="radio" className="custom-control-input" 
							name={"child-gender"+props.index} 
							id={`male${props.index}`}
							value="male"
							onClick={onChangeGender}
							checked={props.child.gender === "male"}
						/>
						<label for={`male${props.index}`} className="custom-control-label">זכר</label>
					</div>
					<div className="custom-control custom-radio">
						<input type="radio" className="custom-control-input" 
							name={"child-gender"+props.index}
							id={`female${props.index}`}
							value="female"
							onClick={onChangeGender}
							checked={props.child.gender === "female"}
						/>
						<label for={`female${props.index}`} className="custom-control-label">נקבה</label>
					</div>
				</div>
			</td>
			<td>
				{calcAge()}
			</td>
			<td>
				<input type='number' className="form-text" onChange={onChangeSum} min='0' value={props.child.sum} />
			</td>
			<td>
				<input type="number" step="0.01" className="form-text" onChange={onChangeAdultPrecent} value={props.child.adultPrecent} />
			</td>
		</tr>
	);
}

ChildData.propTypes = {
	index: PropTypes.number.isRequired,
	child: PropTypes.object.isRequired,
	changeChild: PropTypes.func.isRequired,
	startPaymentDate: PropTypes.object 
};

export default ChildData;
