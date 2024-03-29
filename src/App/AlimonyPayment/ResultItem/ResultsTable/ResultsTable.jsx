import PropTypes from 'prop-types';
import React from 'react'; 

export const ResultsTable = (props) => {
    
      const getRowsData = () => {
          return props.payments.map(payment => (
            <tr>
                <td>{payment.date}</td>
                {payment.childrenPayments.map(childPayment => <td>{childPayment.toLocaleString(undefined,{ minimumFractionDigits: 2 })}</td>)}
                <td>{payment.totalPayment.toLocaleString(undefined,{ minimumFractionDigits: 2 })}</td>
            </tr>
          ));
      }

	return (
		<div id="results-table" className='results-table'>
		   <table style={{direction:"rtl"}} className="table table-bordered">
				<thead className="thead-light"> 
					<tr>
						<th>חודש תשלום</th>
						{props.children.map(child => <th>{child.name}</th>)}
						<th>סה"כ</th>
					</tr>
				</thead>
				<tbody>
					{getRowsData()}
				</tbody>
			</table>
		</div>
	);
}

ResultsTable.propTypes = {
    payments: PropTypes.array.isRequired,
    children: PropTypes.array
}