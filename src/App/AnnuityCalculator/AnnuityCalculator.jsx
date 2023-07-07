import React from 'react';
import { useState } from 'react';

import { GET_SERVER_URL } from '../config';
import Payload from './Payload';
import DepositsTable from './DepositsTable';
import AnnuitiesResult from './AnnuitiesResult';

const AnnuityCalculator = () => {
    const [deposits, setDeposits] = useState(undefined);

    const importDepositsData = (depositsArray) => {
        const sortedDeposites = depositsArray.sort((x, y) => parseInt(x.paymentMonth) - parseInt(y.paymentMonth));
        const noDupsDeposites = [sortedDeposites[0]];

        for (let i = 0; i < sortedDeposites.length - 1; i++) {
            if (sortedDeposites[i].paymentMonth == sortedDeposites[i + 1].paymentMonth) {
                if (noDupsDeposites[noDupsDeposites.length - 1].paymentMonth == sortedDeposites[i].paymentMonth) {
                    noDupsDeposites[noDupsDeposites.length - 1].depositeEmpoloyee += sortedDeposites[i + 1].depositeEmpoloyee;
                    noDupsDeposites[noDupsDeposites.length - 1].depositeCompany += sortedDeposites[i + 1].depositeCompany;
                    noDupsDeposites[noDupsDeposites.length - 1].depositeCompensation += sortedDeposites[i + 1].depositeCompensation;
                }
            } else {
                noDupsDeposites.push(sortedDeposites[i + 1])
            }
        }

        setDeposits(noDupsDeposites);
    }

    const calculateAnnuitiesDeposits = async (deposits) => {
        const apiUrl = `${GET_SERVER_URL()}/annuityDepositsCalculator`;

        const response = await fetch(apiUrl, {
            credentials: "include",
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ deposits })
        });

        const result = await response.json();
        setDeposits(result.result);
    }

    const getResultForComponent = () => {
        const result = deposits.reduce((accumulator, currentValue) =>
        ({
            employee: accumulator.employee + currentValue.depositeFreeEmployee,
            company: accumulator.company + currentValue.depositeFreeCompany,
            compensation: accumulator.compensation + currentValue.depositeFreeCompensation,
            total: accumulator.total + currentValue.total,
        }),
            { employee: 0, company: 0, compensation: 0, total: 0 })

        return result
    }

    return (
        <div>
            <h1 id={"annuities-header"}>חישוב הפקדות לקצבה מוכרת</h1>
            <Payload onImport={importDepositsData} onCalculate={calculateAnnuitiesDeposits}></Payload>

            <DepositsTable onClickCalculateDeposits={calculateAnnuitiesDeposits}></DepositsTable>

            {deposits ? <AnnuitiesResult result={getResultForComponent()} deposits={deposits}></AnnuitiesResult> : <></>}
        </div>
    );
}

export default AnnuityCalculator;
