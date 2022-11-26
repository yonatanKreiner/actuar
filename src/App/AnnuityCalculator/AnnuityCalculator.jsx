import React from 'react'; 
import { useState } from 'react';
import AnnuityDepositTable from './AnnuityDepositTable';
import Payload from './Payload';

const AnnuityCalculator = () => {
    const [deposits, setDeposits] = useState([]);
    
    const importDepositsData = (depositsArray) => {
        setDeposits(depositsArray);
        console.log(depositsArray)
    }

    const calculateAnnuitiesDeposits = async () => {
        const apiUrl = process.env.NODE_ENV === 'production' ? '/interest/annuityDepositsCalculator': 'http://localhost:7000/interest/annuityDepositsCalculator';

		const response = await fetch(apiUrl,{
			credentials: "include",
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({deposits})
		});

        const result = await response.json();
        setDeposits(result.result);
    }

    return (
			<div>
				<h1>חישוב הפקדות לקצבה מוכרת</h1>
                <Payload onImport={importDepositsData} onCalculate={calculateAnnuitiesDeposits}></Payload>
                <AnnuityDepositTable rows={deposits}></AnnuityDepositTable>
			</div>
    );
}

export default AnnuityCalculator;
