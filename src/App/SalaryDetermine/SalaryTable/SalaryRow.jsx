
import React from 'react'; 
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";

const SalaryRow = (props) => {
    const setSum = (e) => {
        props.changeRow({
            date: props.date,
            sum: e.target.value,
            sumEmployee: props.sumEmployee,
            sumCompany: props.sumCompany
        }, props.index)
    }
    const setSumEmployee = (e) => {
        props.changeRow({
            date: props.date,
            sum: props.sum,
            sumEmployee: e.target.value,
            sumCompany: props.sumCompany,
        }, props.index)
    }

    const setSumCompany = (e) => {
        props.changeRow({
            date: props.date,
            sum: props.sum,
            sumEmployee: props.sumEmployee,
            sumCompany: e.target.value,
        }, props.index)
    }

    const setDate = (value) => {
        props.changeRow({
            date: value,
            sum: props.sum,
        }, props.index)
    }

	return (
        <tr>
            <td><DatePicker selected={new Date(props.date)} onChange={setDate} dateFormat={"MM/yyyy"} /></td>
            <td>
                <input style={{margin: 'auto'}}
                    type='number' className="form-text" onChange={setSum} value={props.sum} />
            </td>
            <td>
                <input style={{margin: 'auto'}}
                    type='number' className="form-text" onChange={setSumEmployee} value={props.sumEmployee} />
            </td>
            <td>
                <input style={{margin: 'auto'}}
                    type='number' className="form-text" onChange={setSumCompany} value={props.sumCompany} />
            </td>
        </tr>
	);
}

SalaryRow.propTypes = {
	date: PropTypes.object.isRequired,
    sum: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    changeRow: PropTypes.func
}

export default SalaryRow;
