
import React from 'react'; 
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";

const IterestRow = (props) => {
    const setRegularInterest = (e) => {
        props.changeRow({
            date: props.date,
            regularInterest: e.target.value,
        }, props.index)
    }

    const setDate = (value) => {
        props.changeRow({
            date: value,
            regularInterest: props.regularInterest,
        }, props.index)
    }

	return (
        <tr>
            <td><DatePicker selected={new Date(props.date)} onChange={setDate} dateFormat={"MM/yyyy"} /></td>
            <td>
                <input style={{margin: 'auto'}}
                    type='number' className="form-text" onChange={setRegularInterest} value={props.regularInterest} />
            </td>
            <td>{props.compoundInterest}</td>
        </tr>
	);
}

IterestRow.propTypes = {
	date: PropTypes.object.isRequired,
    regularInterest: PropTypes.number.isRequired,
    compoundInterest: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    changeRow: PropTypes.func
}

export default IterestRow;
