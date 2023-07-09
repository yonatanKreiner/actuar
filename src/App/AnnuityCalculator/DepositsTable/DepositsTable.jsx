
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
                    year: deposits.length > 0 ? (parseInt(deposits[deposits.length-1].year)+1) : new Date().getFullYear(),
                    depositeEmpoloyee: deposits.length > 0 ? deposits[deposits.length-1].depositeEmpoloyee : 0,
                    depositeCompany: deposits.length > 0 ? deposits[deposits.length-1].depositeCompany : 0,
                    depositeCompensation: deposits.length > 0 ? deposits[deposits.length-1].depositeCompensation : 0
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
                                                                    depositeEmpoloyee: row.depositeEmpoloyee,
                                                                    depositeCompany: row.depositeCompany,
                                                                    depositeCompensation: row.depositeCompensation
                                                                })}/></td>
                <td><input value={row.depositeEmpoloyee}                      
                        onChange={(e) => updateTableLocalState(index, 
                                                                {
                                                                    year: row.year,
                                                                    depositeEmpoloyee: e.target.value,
                                                                    depositeCompany: row.depositeCompany,
                                                                    depositeCompensation: row.depositeCompensation
                                                                })}/></td>
                <td><input value={row.depositeCompany}
                        onChange={(e) => updateTableLocalState(index, 
                                                                {
                                                                    year: row.year,
                                                                    depositeEmpoloyee: row.depositeEmpoloyee,
                                                                    depositeCompany: e.target.value,
                                                                    depositeCompensation: row.depositeCompensation
                                                                })}/></td>
                <td><input value={row.depositeCompensation} 
                        onChange={(e) => updateTableLocalState(index, 
                                                                {
                                                                    year: row.year,
                                                                    depositeEmpoloyee: row.depositeEmpoloyee,
                                                                    depositeCompany: row.depositeCompany,
                                                                    depositeCompensation: e.target.value
                                                                })}/></td>
            </tr>
		));
	});

    const calculteResults = () => {
        props.onClickCalculateDeposits(deposits)
    }

	return (
        <div>
            <h3>טבלת הפקדות</h3>
            <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-evenly'}}>
                {generateTable(deposits)}
            </div>
            <button className='btn btn-outline-warning' onClick={addTableLocalStateRow}>הוסף שורה</button>
            <button className='btn btn-outline-warning' onClick={removeTableLocalStateRow}>מחק שורה</button>
            <button className='btn btn-outline-info' onClick={calculteResults} style={{width: 'fit-content'}}>חשב סה"כ הפקדות מוכרות</button>
        </div>
	);
}

export default DepositsTable;
