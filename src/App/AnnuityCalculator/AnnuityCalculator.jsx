import React from 'react';
import { useState } from 'react';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import { GET_SERVER_URL } from '../config';
import AnnuityDepositTable from './AnnuityDepositTable';
import Payload from './Payload';
import RecognizedDeposits from './RecognizedDeposits';
import DepositsTable from './DepositsTable';

const AnnuityCalculator = () => {
    const [deposits, setDeposits] = useState([]);
    const [useYearly, setUseYearly] = useState(false);
    const [depositsYearly, setDepositYearly] = useState([]);

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

    const calculateAnnuitiesDeposits = async () => {
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

    const generatePDF = async () => {
        const input = document.getElementById('annuities-data-table');
        const resultTableCanvas = await html2canvas(input);
        const headerCanvas = await html2canvas(document.getElementById('annuities-header'));
        const resultsImgData = resultTableCanvas.toDataURL('image/png');
        const headerImgData = headerCanvas.toDataURL('image/png');

        const pdf = new jsPDF("p", "mm", "a4");

        const imgProps = pdf.getImageProperties(resultsImgData);
        const width = pdf.internal.pageSize.getWidth();
        const height = (imgProps.height * width) / imgProps.width;

        const pageHeight = 295;
        let heightLeft = height;
        let position = 30;

        pdf.addImage(headerImgData, 'JPEG', -0.55 * width, 5);
        pdf.addImage(resultsImgData, 'JPEG', 2, 30, width - 4, height);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position += heightLeft - height; // top padding for other pages
            pdf.addPage();
            pdf.addImage(resultsImgData, 'PNG', 0, position, width - 4, height);
            heightLeft -= pageHeight;
        }

        pdf.save("חישוב הפקדות לקצבה מוכרת.pdf");
    }

    const convertMonthlyToYearly = () => {
        const yearlyDeposits = deposits.reduce(function (res, value) {
            const year =  new Date(value.paymentMonthDisplay).getFullYear();
            if (!res[year]) {
                res[year] = { ...value, year: year };
            } else {
                res[year].depositeEmpoloyee += value.depositeEmpoloyee;
                res[year].depositeCompany += value.depositeCompany;
                res[year].depositeCompensation += value.depositeCompensation;
                res[year].depositeFreeEmployee += value.depositeFreeEmployee;
                res[year].depositeFreeCompany += value.depositeFreeCompany;
                res[year].depositeFreeCompensation += value.depositeFreeCompensation;
                res[year].total += value.total;
            }

            return res;
        }, {});

        setDepositYearly(Object.values(yearlyDeposits))
        setUseYearly(true);
    }

    return (
        <div>
            <h1 id={"annuities-header"}>חישוב הפקדות לקצבה מוכרת</h1>
            <Payload onImport={importDepositsData} onCalculate={calculateAnnuitiesDeposits} results={deposits} onClickGeneratePDF={generatePDF} onClickMoveToYearly={convertMonthlyToYearly}></Payload>
           
            <DepositsTable></DepositsTable>
            
            {/* <AnnuityDepositTable isYearly={useYearly} rows={useYearly ? depositsYearly : deposits}></AnnuityDepositTable> */}
            {/* {useYearly ? <RecognizedDeposits></RecognizedDeposits> : <></>} */}
        </div>
    );
}

export default AnnuityCalculator;
