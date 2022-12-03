
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
		return data.map(row => (
		    <tr>
                <td>{row.year}</td>
                <td>{row.avgSalary}</td>
                <td>{row.annuityFreeFromTax}</td>
                <td>{row.maxCompensation}</td>
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
		</div>
	);
}

export default AnnuitiesTable;
