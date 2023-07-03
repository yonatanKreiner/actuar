
import React, {useState} from 'react'; 

const DepositsTable = (props) => {
    const [deposits, setDeposits] = useState([]);

    const updateTableLocalState = (index, newRow) => {
        const newDeposits = [...deposits]
        newDeposits[index] = newRow;
        setDeposits(newDeposits);
    }

    const addTableLocalStateRow = () => {
        const newDeposits = 
            [...deposits, 
                {
                    year: new Date().getFullYear(),
                    employee: 0,
                    company: 0,
                    compensation: 0
                }
            ]
            setDeposits(newDeposits);
    }

    const removeTableLocalStateRow = () => {
        let newDeposits = [...deposits]
        newDeposits = newDeposits.slice(0, newDeposits.length-1)
        setDeposits(newDeposits);
    }

    const generateTable = (data) => {
        return (
            <div>
                <table style={{direction:"rtl"}} className="table table-bordered">
                    <thead className="thead-light"> 
                        <tr>
                            <th>שנה</th>
                            <th>הפקדה מוכרת עובד</th>
                            <th>הפקדה מוכרת מעסיק</th>
                            <th>הפקדה מוכרת פיצויים</th>
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
                                                                    employee: row.employee,
                                                                    company: row.company,
                                                                    compensation: row.compensation
                                                                })}/></td>
                <td><input value={row.avgSalary}                      
                        onChange={(e) => updateTableLocalState(index, 
                                                                {
                                                                    year: row.year,
                                                                    employee: e.target.value,
                                                                    company: row.company,
                                                                    compensation: row.compensation
                                                                })}/></td>
                <td><input value={row.annuityFreeFromTax}
                        onChange={(e) => updateTableLocalState(index, 
                                                                {
                                                                    year: row.year,
                                                                    employee: row.employee,
                                                                    company: e.target.value,
                                                                    compensation: row.compensation
                                                                })}/></td>
                <td><input value={row.maxCompensation} 
                        onChange={(e) => updateTableLocalState(index, 
                                                                {
                                                                    year: row.year,
                                                                    employee: row.employee,
                                                                    company: row.company,
                                                                    compensation: e.target.value
                                                                })}/></td>
            </tr>
		));
	});

	return (
        <div>
            <h3>טבלת הפקדות</h3>
            <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-evenly'}}>
                {generateTable(deposits)}
            </div>
            <button className='btn btn-outline-warning' onClick={addTableLocalStateRow}>הוסף שורה</button>
            <button className='btn btn-outline-warning' onClick={removeTableLocalStateRow}>מחק שורה</button>
            <button className='btn btn-outline-info' style={{width: 'fit-content'}}>חשב סה"כ הפקדות מוכרות</button>
        </div>
	);
}

export default DepositsTable;
