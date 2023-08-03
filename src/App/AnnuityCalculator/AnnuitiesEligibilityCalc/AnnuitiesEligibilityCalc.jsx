
import React, {useState} from 'react'; 

const AnnuitiesEligibilityCalc = ({sumDeposits, knownSumDeposits}) => {
    const [factor, setFactor] = useState(1);

	return (
        <div>
            <h3>תחשיב שווי זכאות נוספת</h3>
            <div>
               סה"כ הפקדות ידועות בקופות - סה"כ הפקדות 
            </div>
            <div>
            {sumDeposits - knownSumDeposits} = {knownSumDeposits} - {sumDeposits} 
                </div>
            <div>
                
            {((sumDeposits - knownSumDeposits) * factor).toLocaleString(undefined,{ minimumFractionDigits: 2 })}
            = {sumDeposits - knownSumDeposits} X <input type='number' value={factor}
                                                                 placeholder='מקדם' onChange={(e) => setFactor(e.target.value)}/>
               
            </div>
            {/* <button className='btn btn-outline-info' style={{width: 'fit-content'}}>הפק טופס</button> */}
        </div>
	);
}

export default AnnuitiesEligibilityCalc;
