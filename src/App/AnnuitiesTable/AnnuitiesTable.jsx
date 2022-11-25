
import React, {useEffect, useState} from 'react'; 

const AnnuitiesTable = (props) => {

    const [annuities, setAnnuities] = useState([]);

    const getInterestsTable = async () => {
        const apiUrl = process.env.NODE_ENV === 'production' ? '/interest/annuitiesTable': 'http://localhost:7000/interest/annuitiesTable';

		const response = await fetch(apiUrl,{
			credentials: "include"
		});

        const result = await response.json();
        setAnnuities(result.result);
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
		</div>
	);
}

export default AnnuitiesTable;
