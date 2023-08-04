
import React, {useState} from 'react'; 

const AnnuitiesEligibilityCalc = ({sumDeposits, knownSumDeposits, generateAnnuitiesForm}) => {
    const [factor, setFactor] = useState(1);

    const generateFormClick = () => {
        generateAnnuitiesForm(((sumDeposits - knownSumDeposits) * factor).toFixed(2));
    }

	return (
        <div>
            <h3>תחשיב שווי זכאות מוכרת</h3>
            <div>
            שווי זכאות מוכרת = (סה"כ הפקדות ידועות בקופות - סה"כ הפקדות) X מקדם 
            </div>
            <div>
            {sumDeposits - knownSumDeposits} = {knownSumDeposits} - {sumDeposits} 
                </div>
            <div>
                
            {((sumDeposits - knownSumDeposits) * factor).toLocaleString(undefined,{ minimumFractionDigits: 2 })}
            = {sumDeposits - knownSumDeposits} X <input type='number' value={factor}
                                                                 placeholder='מקדם' onChange={(e) => setFactor(e.target.value)}/>
               
            </div>
            <button className='btn btn-outline-info' onClick={generateFormClick}
                    style={{width: 'fit-content'}}>הפק טופס</button>
        </div>
	);
}

export default AnnuitiesEligibilityCalc;
