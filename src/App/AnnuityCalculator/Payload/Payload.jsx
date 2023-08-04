import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import CsvReader from './CSVReader';

const Payload = ({ userDetails, setUserDetails, onImport }) => {

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
                            id: userDetails.id,
                            gender: userDetails.gender,
                            birthDate: userDetails.birthDate,
                            retirement: userDetails.retirement
                        })
                        } />
                    </div>
                    <div>
                        תעודת זהות: &nbsp;
                        <input type='text' value={userDetails.id} onChange={(e) => setUserDetails({
                            name: userDetails.name,
                            id: e.target.value,
                            gender: userDetails.gender,
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
                                id: userDetails.id,
                                gender: userDetails.gender,
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
                            id: userDetails.id,
                            gender: userDetails.gender,
                            birthDate: userDetails.birthDate,
                            retirement: e.target.value
                        })
                        } />
                    </div>

                     <div className='radio-block'>
                        <div className="custom-control custom-radio">
                            <input type="radio" className="custom-control-input"
                                name={"child-gender"}
                                id={`male`}
                                value="male"
                                onClick={(e) => setUserDetails({
                                    name: userDetails.name,
                                    id: userDetails.id,
                                    gender: e.target.value,
                                    birthDate: userDetails.birthDate,
                                    retirement: 67
                                })}
                                checked={userDetails.gender === "male"}
                            />
                            <label for={`male`} className="custom-control-label">זכר</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input type="radio" className="custom-control-input"
                                name={"child-gender"}
                                id={`female`}
                                value="female"
                                onClick={(e) => setUserDetails({
                                    name: userDetails.name,
                                    id: userDetails.id,
                                    gender: e.target.value,
                                    birthDate: userDetails.birthDate,
                                    retirement: 64
                                })}
                                checked={userDetails.gender === "female"}
                            />
                            <label for={`female`} className="custom-control-label">נקבה</label>
                        </div>
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
