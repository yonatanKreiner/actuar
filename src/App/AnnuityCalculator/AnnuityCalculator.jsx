import React from 'react'; 
import { useState } from 'react';
import { GET_SERVER_URL } from '../config';
import AnnuityDepositTable from './AnnuityDepositTable';
import Payload from './Payload';

const AnnuityCalculator = () => {
    const [deposits, setDeposits] = useState([]);
    
    const importDepositsData = (depositsArray) => {
        const sortedDeposites = depositsArray.sort((x, y) => x.paymentMonth - y.paymentMonth);
        const noDupsDeposites = [sortedDeposites[0]];

        for(let i = 0; i<sortedDeposites.length-1; i++){
            if(sortedDeposites[i].paymentMonth == sortedDeposites[i+1].paymentMonth){
                if(noDupsDeposites[noDupsDeposites.length - 1].paymentMonth == sortedDeposites[i].paymentMonth){
                    noDupsDeposites[noDupsDeposites.length - 1].depositeEmpoloyee += sortedDeposites[i+1].depositeEmpoloyee;
                    noDupsDeposites[noDupsDeposites.length - 1].depositeCompany += sortedDeposites[i+1].depositeCompany;
                    noDupsDeposites[noDupsDeposites.length - 1].depositeCompensation += sortedDeposites[i+1].depositeCompensation;
                }
            }else{
                noDupsDeposites.push(sortedDeposites[i+1])
            }
        }

        setDeposits(noDupsDeposites);
    }

    const calculateAnnuitiesDeposits = async () => {
        const apiUrl =`${GET_SERVER_URL()}/annuityDepositsCalculator`;

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
                <Payload onImport={importDepositsData} onCalculate={calculateAnnuitiesDeposits} results={deposits}></Payload>
                <AnnuityDepositTable rows={deposits}></AnnuityDepositTable>
			</div>
    );
}

export default AnnuityCalculator;
