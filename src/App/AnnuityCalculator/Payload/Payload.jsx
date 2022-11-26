import React from 'react'; 
import { useState } from 'react';
// import {ExcelRenderer} from 'react-excel-renderer';
import { ExcelRenderer } from './importExcel';
import ReactLoading from 'react-loading';
import CsvReader from './CSVReader';

const Payload = ({onImport, onCalculate}) => {

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
        debugger;
        const deposits = [];
        let index = 1;

        while(rows.length > index && rows[index].length>0) {
            deposits.push({
                paymentMonth: rows[index][2],
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
                <br />
                {isLoading ? <ReactLoading className="loader" color={'#2196F3'} /> : <></>}
			</div>
    );
}

export default Payload;
