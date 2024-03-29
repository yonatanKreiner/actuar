import './GeneralPayload.css';

import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'react-simple-snackbar'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const GeneralPayload = (props) => {

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

    const onChangeKerenName = (e) => {
        props.onChange({
            kerenName: e.target.value,
            clientName: props.payload.clientName,
            birthDate: props.payload.birthDate,
            gender: props.payload.gender,
            marriageStatus: props.payload.marriageStatus,
            numOfChildren: props.payload.numOfChildren,
            calculationDate: props.payload.calculationDate
        });
    }

    const onChangeClientName = (e) => {
        props.onChange({
            kerenName: props.payload.kerenName,
            clientName: e.target.value,
            birthDate: props.payload.birthDate,
            gender: props.payload.gender,
            marriageStatus: props.payload.marriageStatus,
            numOfChildren: props.payload.numOfChildren,
            calculationDate: props.payload.calculationDate
        });
    }

    const onChangeBirthDate = (value) => {
        props.onChange({
            kerenName: props.payload.kerenName,
            clientName: props.payload.clientName,
            birthDate: value,
            gender: props.payload.gender,
            marriageStatus: props.payload.marriageStatus,
            numOfChildren: props.payload.numOfChildren,
            calculationDate: props.payload.calculationDate
        });
    }

    const onChangeNumOfChildren = (e) => {
        props.onChange({
            kerenName: props.payload.kerenName,
            clientName: props.payload.clientName,
            birthDate: props.payload.birthDate,
            gender: props.payload.gender,
            marriageStatus: props.payload.marriageStatus,
            numOfChildren: e.target.value,
            calculationDate: props.payload.calculationDate
        });
    }

    const onChangeCalculationDate = (value) => {
        props.onChange({
            kerenName: props.payload.kerenName,
            clientName: props.payload.clientName,
            birthDate: props.payload.birthDate,
            gender: props.payload.gender,
            marriageStatus: props.payload.marriageStatus,
            numOfChildren: props.payload.numOfChildren,
            calculationDate: value
        });
    }

    return (
        <div className='salary-determine-general'>
            <h5 style={{textAlign:"right"}}>פרטי ההסכם</h5>
            <span className='general-payload'>
                שם הקרן: 
                <input type='text' onChange={onChangeKerenName} value={props.payload.kerenName} className="form-text madad-interval-picker" />
            </span>
            <span className='general-payload'>
                שם המבוטח: 
                <input type='text' onChange={onChangeClientName} value={props.payload.clientName} className="form-text madad-interval-picker" />
            </span>
            <span className='general-payload'>
                תאריך לידה:
                <div className="datepicker">
                    <DatePicker onChange={onChangeBirthDate} selected={props.payload.birthDate} dateFormat={"dd/MM/yyyy"} />
                </div>
            </span>
            <span className='general-payload'>
                מספר ילדים: 
                <input type='number' max={10} min={0} onChange={onChangeNumOfChildren} value={props.payload.numOfChildren} className="form-text madad-interval-picker" />
            </span>
            <span className='general-payload'>
                חודש התחשיב:
                <div className="datepicker">
                    <DatePicker onChange={onChangeCalculationDate} selected={props.payload.calculationDate} dateFormat={"dd/MM/yyyy"} />
                </div>
            </span>
        </div>
    );
}

GeneralPayload.propTypes = {
	payload: PropTypes.object.isRequired,
    onChange: PropTypes.func
};

export default GeneralPayload;
