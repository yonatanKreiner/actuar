import React from 'react'

import PropTypes from 'prop-types';

export default function CsvReader(props){
    const processCSV = (str, delim=',') => {
        let headers = str.slice(0,str.indexOf('\n')).split(delim);
        headers = headers.map(x => x.trim());
        const rows = str.slice(str.indexOf('\n')+1).split('\n');

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
        debugger;
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = function(e) {
            const text = e.target.result;
            console.log(text);
            const csvData = processCSV(text); // plugged in here
            console.log(csvData);

            props.importDebts(csvData);
        }

        reader.readAsText(file);
    }

    return(
        <form id='csv-form'>
            <input
                type='file'
                accept='.csv'
                id='csvFile'
                onChange={(e) => {
                    submit(e.target.files[0])
                }}
            >
            </input>
        </form>
    );
}

CsvReader.propTypes = {
	importDebts: PropTypes.func.isRequired
}
