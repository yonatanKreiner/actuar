import React from 'react'

import PropTypes from 'prop-types';
import moment from 'moment';


export default function CsvReader(props){
    const processCSV = (str, delim=',') => {
        let headers = str.slice(0,str.indexOf('\n')).split(delim);
        headers = headers.map(x => x.trim());
        let rows = str.slice(str.indexOf('\n')+1).split('\n');
        rows = rows.filter(x => x !== "");

        const newArray = rows.map( row => {
            const values = row.split(delim);
                const eachObject = headers.reduce((obj, header, i) => {
                    obj[header] = values[i].trim();
                    return obj;
                }, {})
            return eachObject;
        })

        return newArray;
    }

    const submit = (csvFile) => {
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = function(e) {
            const text = e.target.result;
            console.log(text);
            const csvData = processCSV(text); // plugged in here
            console.log(csvData);

            props.importDebts(csvData.map(row => (
                {
                    startDate: moment(row.startDate, 'DD/MM/YYYY').toDate(),
                    sum: parseFloat(row.sum),
                    interestType: row.interestType == "legal" ? 'legal-interest' : 
                                    row.interestType == "illegal" ? 'illegal-interest' :
                                    row.interestType == "shekel" ? 'shekel-interest' : 'indexate-only',
                    endDate: moment(row.endDate, 'DD/MM/YYYY').toDate()
                })));
        }

        reader.readAsText(file);
    }

    return(
        <input
            type='file'
            accept='.csv'
            id='csvFile'
            onChange={(e) => {
                submit(e.target.files[0])
            }}
            title="(לפי הפורמט csv) ייבוא מקובץ"
        >
        </input>
    );
}

CsvReader.propTypes = {
	importDebts: PropTypes.func.isRequired
}
