
import React, {useState} from 'react'; 
import { CSVLink } from "react-csv";

const AnnuitiesResult = ({result, deposits}) => {
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
            <CSVLink
                data={deposits}
                headers={[
                    {label:"שנה", key: "year"},
                    {label:"הפקדת עובד", key: "depositeEmpoloyee"},
                    {label:"הפקדה מעסיק", key: "depositeCompany"},
                    {label:"הפקדה לפיצויים", key: "depositeCompensation"},
                    {label:"הפקדה לקצבה מוכרת - עובד", key: "depositeFreeEmployee"},
                    {label:"הפקדה לקצבה מוכרת - מעסיק", key: "depositeFreeCompany"},
                    {label: "הפקדה לקצבה מוכרת - פיצויים", key: "depositeFreeCompensation"},
                    {label: 'סה"כ הפקדה', key: "total"}
                ]}
                filename={"חישוב קצבאות.csv"}
                className="btn-open-interest btn btn-outline-info"
                target="_blank"
            >
                ייצא לאקסל
            </CSVLink>
        </div>
	);
}

export default AnnuitiesResult;
