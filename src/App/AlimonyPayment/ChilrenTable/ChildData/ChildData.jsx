import './ChildData.css';

import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'

const ChildData = (props) => {
	
	const [isCustomOptionSelect, setIsCustomOptionSelect] = useState(false);

	const options = [
		{ value: 1/4, label: 'רבע' },
		{ value: 1/3, label: 'שליש' },
		{ value: 1/2, label: 'חצי' },
		{ value: undefined, label: 'אחר' }
	]
	const customStyles = {
		container: (provided, state) => ({
		  ...provided,
		  position: "absolute",
		  width: "160px"
		})
	};

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
	
	const onChangeAdultPrecent = (value) => {
		props.changeChild(props.index, {
			name: props.child.name,
			birthDate: props.child.birthDate,
			sum: props.child.sum,
			adultPrecent: value,
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
		const ageDifMS = new Date(props.startPaymentDate) - new Date(props.child.birthDate);
		const ageDate = new Date(ageDifMS);
		if(ageDate - 1970 < 0) {
			return 0;
		}

		return Math.abs(ageDate.getUTCFullYear() - 1970) + parseFloat((ageDate.getUTCMonth()/12).toFixed(1));
	}

	return (
		<tr className="child-data-container-row">
			<td>
				<input type='text' className="form-text" onChange={onChangeName} value={props.child.name} />
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
				<div style={{height: "70px",display: "flex",justifyContent: "space-between",flexDirection: "column"}}>
					<div>
						<Select options={options} defaultValue={options[0]} styles={customStyles} 
							onChange={(newValue, actionMeta) => {
								if(newValue.value == undefined){
									setIsCustomOptionSelect(true);
								}else{
									onChangeAdultPrecent(newValue.value);
									setIsCustomOptionSelect(false);
								}
							}} />
					</div>
					<input type="number" step="0.01" className="form-text" onChange={(e) => onChangeAdultPrecent(parseFloat(e.target.value))}
							value={props.child.adultPrecent}
							style={{visibility: isCustomOptionSelect ? "visible" : "hidden"}} />
				</div>
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
