
import React, {useEffect, useState} from 'react'; 
import { GET_SERVER_URL } from '../config';
import GeneralPayload from './GeneralPayload';
import ResultItem from './ResultItem';
import SalaryTable from './SalaryTable';

const SalaryDetermine = (props) => {
    const [salaries, setSalaries] = useState([{date: new Date().setDate(1), isIndependendWorker: false, sum: 100, sumEmployee: 6, sumCompany: 6.5}]);
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
        newDate.setDate(1);
        let newSum = 100;
        let newSumEmployee = 6;
        let newSumCompany = 6.5;
        if(salaries.length > 0){
            newDate = new Date(salaries[salaries.length-1].date)
            newDate.setMonth(newDate.getMonth()+1);
            newSum = salaries[salaries.length-1].sum
            newSumEmployee = salaries[salaries.length-1].sumEmployee
            newSumCompany = salaries[salaries.length-1].sumCompany
        }
        setSalaries([...salaries, {date: newDate, isIndependendWorker: false, sum: newSum, sumEmployee: newSumEmployee, sumCompany: newSumCompany}])
    }
    const removeRow = () => {
        setSalaries(salaries.slice(0,salaries.length-1));
    }

    const changeRow = (salary, index) => {
        setSalaries([...salaries.slice(0,index),salary, ...salaries.slice(index+1)]);
    }

	const handleImportSalaries = (salaries) => {
		setSalaries(salaries);
	}

    const calculate = async () => {
        const apiUrl = `${GET_SERVER_URL()}/interest/salaryDetermine`;

		const response = await fetch(apiUrl,{
			method: 'post',
			headers: {"Content-Type": "application/json"},
			credentials: "include",
			body: JSON.stringify({salaries, generalPayload})
		});

		const data = await response.json();
		const results = data;

		return results;
    }

	return (
		<div>
            <h1>שכר קובע</h1>
            <div>
                <GeneralPayload payload={generalPayload} onChange={changeGeneralPayload}></GeneralPayload>
                <SalaryTable salaries={salaries} changeRow={changeRow} removeRow={removeRow} addRow={addRow} importRows={handleImportSalaries}></SalaryTable>
            </div>

            <ResultItem calculate={calculate}></ResultItem>
		</div>
	);
}

export default SalaryDetermine;
