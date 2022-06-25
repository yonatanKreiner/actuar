
import React from 'react'; 
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";

const Row = (props) => {
    const setSum = (e) => {
        props.changeRow({
            startDate: props.startDate,
            endDate: props.endDate,
            sum: e.target.value
        }, props.index)
    }

    const setStartDate = (value) => {
        props.changeRow({
            startDate: value,
            endDate: props.endDate,
            sum: props.sum,
        }, props.index)
    }

    const setEndDate = (value) => {
        props.changeRow({
            startDate: props.startDate,
            endDate: value,
            sum: props.sum,
        }, props.index)
    }

	return (
        <tr>
            <td>
                <input style={{margin: 'auto'}}
                    type='number' className="form-text" onChange={setSum} value={props.sum} />
            </td>
            <td><DatePicker selected={new Date(props.startDate)} onChange={setStartDate} dateFormat={"dd/MM/yyyy"} /></td>
            <td><DatePicker selected={new Date(props.endDate)} onChange={setEndDate} dateFormat={"dd/MM/yyyy"} /></td>
            <td>{props.madadIndexate}</td>
        </tr>
	);
}

Row.propTypes = {
	startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
    sum: PropTypes.number.isRequired,
    madadIndexate: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    changeRow: PropTypes.func
}

export default Row;
