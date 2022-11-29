
import React, {useEffect, useState} from 'react'; 
import { GET_SERVER_URL } from '../config';

const IterestsTable = (props) => {

    const [leagalInterests, setLeagalInterests] = useState([]);
    const [illegalInterests, setIllegalInterests] = useState([]);
    const [shekelInterests, setShekelInterests] = useState([]);

    const getInterestsTable = async () => {
        const apiUrl = `${GET_SERVER_URL()}/interestsTable`;

		const response = await fetch(apiUrl,{
			credentials: "include"
		});

        const result = await response.json();
        setLeagalInterests(result.result.legalInterest);
        setIllegalInterests(result.result.illegalInterest);
        setShekelInterests(result.result.shekelInterest);
    }

    useEffect(() => {
        getInterestsTable();
    }, [])

    const generateTable = (tableName, data) => {
        return (
            <div>
                <h3>{tableName}</h3>
                <table style={{direction:"rtl"}} className="table table-bordered">
                    <thead className="thead-light"> 
                        <tr>
                            <th>תאריך</th>
                            <th>ריבית</th>
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
                <td>{row[0]}</td>
                <td>{row[1]}</td>
            </tr>
		));
	});

	return (
		<div>
            <h1>טבלאות ריבית</h1>
            <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-evenly'}}>
                {generateTable("ריבית צמודה", leagalInterests)}
                {generateTable("ריבית פיגורים", illegalInterests)}
                {generateTable("ריבית שיקלית", shekelInterests)}
            </div>
		</div>
	);
}

export default IterestsTable;
