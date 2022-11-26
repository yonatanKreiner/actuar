
import React from 'react'; 

const AnnuityDepositTable = ({rows}) => {
    const generateTable = (data) => {
        return (
            <div>
                <table style={{direction:"rtl"}} className="table table-bordered">
                    <thead className="thead-light"> 
                        <tr>
                            <th>חודש שכר</th>
                            <th>הפקדת עובד</th>
                            <th>הפקדה מעסיק</th>
                            <th>הפקדה לפיצויים</th>
                            <th>הפקדה לקצבה מוכרת - עובד</th>
                            <th>הפקדה לקצבה מוכרת - מעסיק</th>
                            <th>הפקדה לקצבה מוכרת - פיצויים</th>
                            <th>סה"כ הפקדה</th>
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
                <td>{row.paymentMonth}</td>
                <td>{row.depositeEmpoloyee}</td>
                <td>{row.depositeCompany}</td>
                <td>{row.depositeCompensation}</td>
                <td>{row.depositeFreeEmployee.toLocaleString(undefined,{ minimumFractionDigits: 2 })}</td>
                <td>{row.depositeFreeCompany.toLocaleString(undefined,{ minimumFractionDigits: 2 })}</td>
                <td>{row.depositeFreeCompensation.toLocaleString(undefined,{ minimumFractionDigits: 2 })}</td>
                <td>{row.total.toLocaleString(undefined,{ minimumFractionDigits: 2 })}</td>
            </tr>
		));
	});

	return (
		<div>
            <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-evenly'}}>
                {generateTable(rows)}
            </div>
		</div>
	);
}

export default AnnuityDepositTable;
