
import React, { useEffect } from 'react'; 
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";

const SalaryRow = (props) => {
    const setSum = (e) => {
        props.changeRow({
            date: props.date,
            isIndependendWorker: props.isIndependendWorker,
            sum: e.target.value,
            sumEmployee: (e.target.value) * 0.06,
            sumCompany:  (e.target.value) * 0.065
        }, props.index)
    }
    const setSumEmployee = (e) => {
        props.changeRow({
            date: props.date,
            isIndependendWorker: props.isIndependendWorker,
            sum: props.sum,
            sumEmployee: e.target.value,
            sumCompany: props.sumCompany,
        }, props.index)
    }

    const setSumCompany = (e) => {
        props.changeRow({
            date: props.date,
            isIndependendWorker: props.isIndependendWorker,
            sum: props.sum,
            sumEmployee: props.sumEmployee,
            sumCompany: e.target.value,
        }, props.index)
    }

    const setDate = (value) => {
        const date = new Date(value);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        props.changeRow({
            date: date,
            isIndependendWorker: props.isIndependendWorker,
            sum: props.sum,
            sumEmployee: props.sumEmployee,
            sumCompany: props.sumCompany,
        }, props.index)
    }

    const onChangeWorkerType = (e) => {
        props.changeRow({
            date: props.date,
            isIndependendWorker: e.target.value == 'true',    
            sum: props.sum,
            sumEmployee: props.sumEmployee,
            sumCompany: props.sumCompany,
        }, props.index)
    }

	return (
        <tr>
            <td><DatePicker selected={new Date(props.date)} onChange={setDate} dateFormat={"dd/MM/yyyy"} tabIndex={1} /></td>
            <td>
            <div className='radio-block'>
					<div className="custom-control custom-radio">
						<input type="radio" className="custom-control-input" 
							name={"worker-type"+props.index}
                            id={"independendWorker"+props.index}
							value={true}
							onChange={onChangeWorkerType}
							checked={props.isIndependendWorker}
						/>
						<label for={`independendWorker`+props.index} className="custom-control-label">עצמאי</label>
					</div>
					<div className="custom-control custom-radio">
						<input type="radio" className="custom-control-input" 
							name={"worker-type"+props.index} 
                            id={"notIndependendWorker"+props.index}
							value={false}
							onChange={onChangeWorkerType}
							checked={!props.isIndependendWorker}
						/>
						<label for={`notIndependendWorker`+props.index} className="custom-control-label">שכיר</label>
					</div>
				</div>
            </td>
            <td>
                <input style={{margin: 'auto'}}
                    type='number' className="form-text" onChange={setSum} value={props.sum} tabIndex={2} />
            </td>
            <td>
                <input style={{margin: 'auto'}}
                    type='number' className="form-text" onChange={setSumEmployee} value={props.sumEmployee} tabIndex={3} />
            </td>
            <td>
                <input style={{margin: 'auto'}}
                    type='number' className="form-text" onChange={setSumCompany} value={props.sumCompany} tabIndex={4} />
            </td>
        </tr>
	);
}

SalaryRow.propTypes = {
	date: PropTypes.object.isRequired,
    sum: PropTypes.number.isRequired,
    sumEmployee: PropTypes.number.isRequired,
    sumCompany: PropTypes.number.isRequired,
    isIndependendWorker: PropTypes.bool.isRequired, 
    index: PropTypes.number.isRequired,
    changeRow: PropTypes.func
}

export default SalaryRow;
