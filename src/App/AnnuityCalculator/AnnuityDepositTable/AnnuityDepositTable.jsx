
import React from 'react'; 

const AnnuityDepositTable = ({rows}) => {
    const generateTable = (data) => {
        return (
            <div id={"annuities-data-table"}>
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
                <td>{row.depositeEmpoloyee ? row.depositeEmpoloyee.toLocaleString(undefined,{ minimumFractionDigits: 2})
                    : row.depositeEmpoloyee == 0 ? '-' : ''}</td>
                <td>{row.depositeCompany ? row.depositeCompany.toLocaleString(undefined,{ minimumFractionDigits: 2})
                    : row.depositeCompany == 0 ? '-' : ''}</td>
                <td>{row.depositeCompensation ? row.depositeCompensation.toLocaleString(undefined,{ minimumFractionDigits: 2})
                    : row.depositeCompensation == 0 ? '-' : ''}</td>
                <td>{row.depositeFreeEmployee ? row.depositeFreeEmployee.toLocaleString(undefined,{ minimumFractionDigits: 2 })
                    : row.depositeFreeEmployee  == 0 ? '-':''}</td>
                <td>{row.depositeFreeCompany ? row.depositeFreeCompany.toLocaleString(undefined,{ minimumFractionDigits: 2 })
                    : row.depositeFreeCompany == 0 ? '-' : ''}</td>
                <td>{row.depositeFreeCompensation ? row.depositeFreeCompensation.toLocaleString(undefined,{ minimumFractionDigits: 2 }) 
                    : row.depositeFreeCompensation == 0 ? '-' : ''}</td>
                <td>{row.total ? row.total.toLocaleString(undefined,{ minimumFractionDigits: 2 }) 
                    : row.total == 0 ? '-' : ''}</td>
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
