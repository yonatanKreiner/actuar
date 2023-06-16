
import React, {useState} from 'react'; 

const RecognizedDeposits = (props) => {
    const [isTableOpen, setIsTableOpen] = useState(false); 
    const [annuities, setAnnuities] = useState([]);

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
                    employee: 0,
                    company: 0,
                    compensation: 0
                }
            ]
        setAnnuities(newAnnuities);
    }

    const toggleTable = () => {
        const newToggle = !isTableOpen;
        setIsTableOpen(newToggle);
    }

    const removeTableLocalStateRow = () => {
        let newAnnuities = [...annuities]
        newAnnuities = newAnnuities.slice(0, newAnnuities.length-1)
        setAnnuities(newAnnuities);
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
            {isTableOpen ? 
                <div>
                    <h3>טבלת קצבה מוכרת</h3>
                    <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-evenly'}}>
                        {generateTable(annuities)}
                    </div>
                    <button className='btn btn-outline-warning' onClick={addTableLocalStateRow}>הוסף שורה</button>
                    <button className='btn btn-outline-warning' onClick={removeTableLocalStateRow}>מחק שורה</button>
                    <button className='btn btn-outline-info' style={{width: 'fit-content'}}>חשב הפרשים מול הפקדות</button>
                    <button className='btn btn-outline-info' style={{width: 'fit-content'}}
                        onClick={toggleTable}>
                        סגור טבלת קצבה מוכרת
                    </button>
                </div>
            :
                <button className='btn btn-outline-info' style={{width: 'fit-content'}}
                        onClick={toggleTable}>
                    פתח טבלת קצבה מוכרת
                </button>}
        </div>
	);
}

export default RecognizedDeposits;
