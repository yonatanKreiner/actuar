import React from 'react';
import { useState } from 'react';

import { GET_SERVER_URL } from '../config';
import Payload from './Payload';
import DepositsTable from './DepositsTable';
import AnnuitiesResult from './AnnuitiesResult';
import KnownDepositsTable from './KnownDepositsTable';
import AnnuitiesEligibilityCalc from './AnnuitiesEligibilityCalc';
import PartTwoTablePayload from './PartTwoTablePayload';

const AnnuityCalculator = () => {
    const [deposits, setDeposits] = useState(undefined);
    const [knownDeposits, setKnownDeposits] = useState(undefined);
    const [isShowTableOfExtraDetails, setIsShowTableOfExtraDetails] = useState(false);
    const [isShowEligibilityCalc, setIsShowEligibilityCalc] = useState(false);
    const [isShowPayloadAccordionForPartTwo, setIsShowPayloadAccordionForPartTwo] = useState(false);
    const [userDetails, setUserDetails] = useState({ name: '', id: '', gender: 'male', birthDate: new Date(), retirement: 67 })


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

    const getResultForComponentKnown = () => {
        const result = knownDeposits.reduce((accumulator, currentValue) =>
        ({
            employee: accumulator.employee + parseFloat(currentValue.depositeEmpoloyee),
            company: accumulator.company + parseFloat(currentValue.depositeCompany),
            compensation: accumulator.compensation + parseFloat(currentValue.depositeCompensation)
        }),
            { employee: 0, company: 0, compensation: 0 })

        return result.employee + result.company + result.compensation;
    }

    const prepareEligibilityCalculation = (knownDeposits) => {
        setIsShowEligibilityCalc(!isShowEligibilityCalc);
        setKnownDeposits(knownDeposits)
    }

    const generateAnnuitiesForm = async (total_result) => {
        const apiUrl = `${GET_SERVER_URL()}/annuityForm`;

        const response = await fetch(apiUrl, {
            credentials: "include",
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data: {
                    client_name: userDetails.name,
                    client_id: userDetails.id,
                    client_age: (new Date().getFullYear() - userDetails.birthDate.getFullYear()),
                    client_retirement: userDetails.retirement,
                    client_gender: userDetails.gender === 'male' ? 'זכר' : 'נקבה',
                    total_deposits: getResultForComponent().total,
                    total_known_deposits: getResultForComponentKnown(),
                    total_result: total_result
                }
            })
        });

        const blob = await response.blob();
        console.log(typeof (blob))

        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = "תחשיב שווי זכאות מוכרת.docx";

        link.click()
    }

    const onUpdateUserDetails = (newDetails) => {
        setUserDetails(newDetails)
    }

    return (
        <div>
            <h1 id={"annuities-header"}>חישוב הפקדות לקצבה מוכרת</h1>
            <Payload userDetails={userDetails} setUserDetails={onUpdateUserDetails} onImport={importDepositsData} onCalculate={calculateAnnuitiesDeposits}></Payload>

            <DepositsTable onClickCalculateDeposits={calculateAnnuitiesDeposits}></DepositsTable>

            {deposits ? <AnnuitiesResult result={getResultForComponent()}
                deposits={deposits}
                setShowExtraDepositDetailsTable={setIsShowTableOfExtraDetails} /> : <></>}
            {isShowTableOfExtraDetails ? <KnownDepositsTable continueSummeriesCalculation={prepareEligibilityCalculation} /> : <></>}

            {isShowEligibilityCalc ? <div>
                <AnnuitiesEligibilityCalc
                    knownSumDeposits={getResultForComponentKnown()}
                    sumDeposits={getResultForComponent().total}
                    generateAnnuitiesForm={generateAnnuitiesForm} />
                <button className='btn btn-outline-info'
                    onClick={() => setIsShowPayloadAccordionForPartTwo(true)}
                    style={{ width: 'fit-content' }}>התחל חלק שני של התחשיב</button>
            </div> : <></>}

             {isShowPayloadAccordionForPartTwo ? <PartTwoTablePayload userDetails={userDetails}/> : <></>}
        </div>
    );
}

export default AnnuityCalculator;
