import React from 'react'; 
import { useState } from 'react';
// import {ExcelRenderer} from 'react-excel-renderer';
import { ExcelRenderer } from './importExcel';
import ReactLoading from 'react-loading';
import CsvReader from './CSVReader';
import { CSVLink } from "react-csv";
import moment from 'moment/moment';

const Payload = ({onImport, onCalculate, results, onClickGeneratePDF}) => {

    const [isLoading, setIsLoading] = useState(false);

    const onPickimportFile = (event) => {
        let fileObj = event.target.files[0];
    
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if(err){
                console.log(err);            
            }
            else{
                const deposits = excelArrayToObj(resp.rows);
                onImport(deposits);
            }
        }, "הפקדות");               
    }

    const excelArrayToObj = (rows) => {
        const deposits = [];
        let index = 1;

        while(rows.length > index && rows[index].length>0) {
            deposits.push({
                paymentMonth: rows[index][2],
                paymentMonthDisplay: moment(rows[index][2], "YYYYMM").toDate(),
                depositeEmpoloyee: rows[index][3],
                depositeCompany: rows[index][4],
                depositeCompensation: rows[index][5],
            });
            index++;
        }

        return deposits;
    }

    const onClickCalculate = async () => {
        setIsLoading(true);
        await onCalculate();
        setIsLoading(false);
    }

    const onClickExportPDF = () => {
        setIsLoading(true);
        onClickGeneratePDF();
        setIsLoading(false);
    }

    return (
			<div>
                <div style={{display:'flex',justifyContent: 'center'}}>
                    <span>
                        <input type={"file"} onChange={onPickimportFile}/>
                        <br/>
                        ייבוא ממסלקה
                    </span>
                    <span>
                        <CsvReader importRows={onImport}></CsvReader>
                        <br/>
                        ייבוא לפי פורמט
                    </span>
                </div>
                <button type='button' onClick={() => onClickCalculate()} className='btn-result btn btn-primary'>חשב</button>
                {results && results.length > 0 &&
                    <>
                        <CSVLink
                                    data={results}
                                    headers={[
                                        {label:"חודש שכר", key: "paymentMonth"},
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
                        <button type='button' onClick={onClickExportPDF} className='btn btn-outline-info generate-pdf-btn'>הפק דו"ח</button>
                    </>
                }
                <br />
                {isLoading ? <ReactLoading className="loader" color={'#2196F3'} /> : <></>}
                
			</div>
    );
}

export default Payload;
