import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import CsvReader from './CSVReader';

const Payload = ({ onImport }) => {
    const [userDetails, setUserDetails] = useState({ name: '', birthDate: new Date(), retirement: 67 })

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <span style={{
                    display: 'flex', height: '75px', flexDirection: 'column',
                    justifyContent: 'space-evenly'
                }}>
                    <div>
                        שם לקוח: &nbsp;
                        <input type='text' value={userDetails.name} onChange={(e) => setUserDetails({
                            name: e.target.value,
                            birthDate: userDetails.birthDate,
                            retirement: userDetails.retirement
                        })
                        } />
                    </div>
                    <div>
                        תאריך לידה: &nbsp;
                        <DatePicker selected={new Date(userDetails.birthDate)}
                            onChange={(e) => setUserDetails({
                                name: userDetails.name,
                                birthDate: e,
                                retirement: userDetails.retirement
                            })} dateFormat={"dd/MM/yyyy"} />
                    </div>
                </span>
                <span>
                    <div>
                        גיל: &nbsp;
                        {new Date().getFullYear() - userDetails.birthDate.getFullYear()}
                    </div>
                    <div>
                         גיל פרישה: &nbsp;
                        <input type='number' value={userDetails.retirement} onChange={(e) => setUserDetails({
                            name: userDetails.name,
                            birthDate: userDetails.birthDate,
                            retirement: e.target.value
                        })
                        } />
                    </div>
                </span>
                <span>
                    <CsvReader importRows={onImport}></CsvReader>
                    <br />
                    ייבוא לפי פורמט
                </span>
            </div>

        </div>
    );
}

export default Payload;
