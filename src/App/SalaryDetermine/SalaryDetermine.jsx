
import React, {useEffect, useState} from 'react'; 
import GeneralPayload from './GeneralPayload';
import SalaryTable from './SalaryTable';

const SalaryDetermine = (props) => {
    const [salaries, setSalaries] = useState([{date: new Date(), sum: 1000, sumEmployee: 1000, sumCompany: 1000}]);
    const [generalPayload, setGeneralPayload] = useState({
        kerenName: 'מבטחים חדשה',
        clientName: null,
        birthDate: new Date(),
        gender: 'male',
        marriageStatus: 'single',
        numOfChildren: 0,
        calculationDate: new Date()
    });

    useEffect(() => {

    }, [])

    const changeGeneralPayload = (payload) => {
        setGeneralPayload(payload);
    }

    const addRow = () => {
        let newDate = new Date();
        if(salaries.length > 0){
            newDate = new Date(salaries[salaries.length-1].date)
            newDate.setMonth(newDate.getMonth()+1);
        }
        setSalaries([...salaries, {date: newDate, sum:100, sumEmployee: 100, sumCompany: 100}])
    }
    const removeRow = () => {
        setSalaries(salaries.slice(0,salaries.length-1));
    }

    const changeRow = (salary, index) => {
        setSalaries([...salaries.slice(0,index),salary, ...salaries.slice(index+1)]);
    }

	return (
		<div>
            <h1>שכר קובע</h1>
            <div>
                <GeneralPayload payload={generalPayload} onChange={changeGeneralPayload}></GeneralPayload>
                <SalaryTable salaries={salaries} changeRow={changeRow} removeRow={removeRow} addRow={addRow}></SalaryTable>
            </div>
		</div>
	);
}

export default SalaryDetermine;
