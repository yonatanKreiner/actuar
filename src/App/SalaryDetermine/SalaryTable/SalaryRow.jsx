
import React from 'react'; 
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";

const SalaryRow = (props) => {
    const setSum = (e) => {
        props.changeRow({
            date: props.date,
            sum: e.target.value,
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
