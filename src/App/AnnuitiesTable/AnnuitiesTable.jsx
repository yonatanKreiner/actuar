
import React, {useEffect, useState} from 'react'; 
import { GET_SERVER_URL } from '../config';
import CsvReader from './CSVReader';

const AnnuitiesTable = (props) => {

    const [annuities, setAnnuities] = useState([]);

    const getInterestsTable = async () => {
        const apiUrl = `${GET_SERVER_URL()}/annuitiesTable`;

		const response = await fetch(apiUrl,{
			credentials: "include"
		});

        const result = await response.json();
        setAnnuities(result.result);
    }

    const updateTableLocalState = (index, newRow) => {
        const newAnnuities = [...annuities]
        newAnnuities[index] = newRow;
        setAnnuities(newAnnuities);
    }

    const addTableLocalStateRow = () => {
        const newAnnuities = 
            [...annuities, 
                {
                    year: new Date().getFullYear(),
                    avgSalary: 0,
                    annuityFreeFromTax: 0,
                    maxCompensation: 0
                }
            ]
        setAnnuities(newAnnuities);
    }

    const removeTableLocalStateRow = () => {
        let newAnnuities = [...annuities]
        newAnnuities = newAnnuities.slice(0, newAnnuities.length-1)
        setAnnuities(newAnnuities);
    }

    const updateTable = async (newRows) => {
        const apiUrl = `${GET_SERVER_URL()}/annuitiesTable`;
		const response = await fetch(apiUrl,{
			credentials: "include",
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({annuities: newRows})
		});

        if(response.status == '200'){
            setAnnuities(newRows);
        }
    }

    useEffect(() => {
        getInterestsTable();
    }, [])

    const generateTable = (data) => {
        return (
            <div>
                <table style={{direction:"rtl"}} className="table table-bordered">
                    <thead className="thead-light"> 
                        <tr>
                            <th>שנה</th>
                            <th>שכר ממוצע במשק</th>
                            <th>לקצבה הפתורה ממס בעת הפרישה</th>
                            <th>תקרה להפקדה לפיצויים</th>
                        </tr>
                    </thead>
                    <tbody>
                        {generateRows(data)}
                    </tbody>
                </table>
            </div>
        );
    }

	const generateRows = ((data) => {
		return data.map((row, index) => (
		    <tr>
                <td><input value={row.year} 
                        onChange={(e) => updateTableLocalState(index, 
                                                                {
                                                                    year: e.target.value,
                                                                    avgSalary: row.avgSalary,
                                                                    annuityFreeFromTax: row.annuityFreeFromTax,
                                                                    maxCompensation: row.maxCompensation
                                                                })}/></td>
                <td><input value={row.avgSalary}                      
                        onChange={(e) => updateTableLocalState(index, 
                                                                {
                                                                    year: row.year,
                                                                    avgSalary: e.target.value,
                                                                    annuityFreeFromTax: row.annuityFreeFromTax,
                                                                    maxCompensation: row.maxCompensation
                                                                })}/></td>
                <td><input value={row.annuityFreeFromTax}
                        onChange={(e) => updateTableLocalState(index, 
                                                                {
                                                                    year: row.year,
                                                                    avgSalary: row.avgSalary,
                                                                    annuityFreeFromTax: e.target.value,
                                                                    maxCompensation: row.maxCompensation
                                                                })}/></td>
                <td><input value={row.maxCompensation} 
                        onChange={(e) => updateTableLocalState(index, 
                                                                {
                                                                    year: row.year,
                                                                    avgSalary: row.avgSalary,
                                                                    annuityFreeFromTax: row.annuityFreeFromTax,
                                                                    maxCompensation: e.target.value
                                                                })}/></td>
            </tr>
		));
	});

	return (
		<div>
            <h1>טבלאות עזר קצבאות</h1>
            <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-evenly'}}>
                {generateTable(annuities)}
            </div>
            <CsvReader importRows={updateTable}></CsvReader>
            <button className='btn btn-outline-info' onClick={()=>updateTable(annuities)}>שמור שינויים</button>
            <button className='btn btn-outline-warning' onClick={addTableLocalStateRow}>הוסף שורה</button>
            <button className='btn btn-outline-warning' onClick={removeTableLocalStateRow}>מחק שורה</button>
		</div>
	);
}

export default AnnuitiesTable;
