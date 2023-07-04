
import React, {useState} from 'react'; 

const AnnuitiesResult = ({result}) => {
    const generateTable = (data) => {
        return (
            <div>
                <table style={{direction:"rtl"}} className="table table-bordered">
                    <thead className="thead-light"> 
                        <tr>
                            <th></th>
                            <th>תגמולי עובד</th>
                            <th>תגמולי מעסיק</th>
                            <th>פיצויים</th>
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
		return (
		    <tr>
                <td>סה"כ מוכרים ככספים פטורים</td>
                <td>{data.employee}</td>
                <td>{data.company}</td>
                <td>{data.compensation}</td>
            </tr>
		);
	});

	return (
        <div>
            <h3>תוצאות</h3>
            <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-evenly'}}>
                {generateTable(result)}
            </div>
             <button className='btn btn-outline-info' style={{width: 'fit-content'}}>ייצא לאקסל</button>
        </div>
	);
}

export default AnnuitiesResult;
