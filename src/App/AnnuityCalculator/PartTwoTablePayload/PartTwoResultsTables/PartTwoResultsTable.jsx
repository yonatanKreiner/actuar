import React from 'react';
import 'react-accessible-accordion/dist/fancy-example.css';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import { GET_SERVER_URL } from '../../../config';

const PartTwoResultsTable = ({ policiesTable, userDetails }) => {

    const generateDeposits = (policy) => {
        return (
            policy.deposits.map((d) => (
                <tr>
                    <td>
                        {d.year}
                    </td>
                    <td>
                        {d.notExemptEmpoloyee}
                    </td>
                    <td>
                        {d.exemptEmpoloyee}
                    </td>
                    <td>
                        {d.notExemptCompany}
                    </td>
                    <td>
                        {d.exemptCompany}
                    </td>
                    <td>
                        {d.notExemptCompensation}
                    </td>
                    <td>
                        {d.exemptCompensation}
                    </td>
                </tr>)
            )
        )
    }

    const generatePolicies = () => {
        return policiesTable.map((p) => {
            return (<AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        <table style={{ direction: "rtl" }} className="table">
                            <thead>
                                <th>קופה</th>
                                <th>מס תוכנית/פוליסה</th>
                                <th>סוג</th>
                                <th>מדרג</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {p.name}
                                    </td>
                                    <td>
                                        {p.id}
                                    </td>
                                    <td>
                                        {p.type}
                                    </td>
                                    <td>
                                        {p.order}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div>
                        <table style={{ direction: "rtl" }} className="table">
                            <thead className="thead-light">
                                <th>שנת מס</th>
                                <th>עובד לא פטור ממס</th>
                                <th>עובד פטור ממס</th>
                                <th>מעסיק לא פטור ממס</th>
                                <th>מעסיק פטור ממס</th>
                                <th>פיצויים לא פטור ממס</th>
                                <th>פיצויים פטור ממס</th>
                            </thead>
                            <tbody>
                                {generateDeposits(p)}
                            </tbody>
                        </table>
                    </div>
                </AccordionItemPanel>
            </AccordionItem>)
        })
    }

    const onClickExportToCSV = () => {
        const totalPolicies = policiesTable.map(x => {
            const title = [`קופה: ${x.name}`, `מספר תוכנית:${x.id}`, x.type, `מדרג: ${x.order}`].join(',');
            const header = ['שנה', 'עובד לא פטור', 'עובד פטור', 'מעסיק לא פטור', 'מעסיק פטור', 'פיצויים לא פטור', 'פיצויים פטור'].join(',');

            const data = x.deposits.map(d =>
                [d.year, d.notExemptEmpoloyee, d.exemptEmpoloyee, d.notExemptCompany, d.exemptCompany, d.notExemptCompensation, d.exemptCompensation].join(','))

            const totalPolicy = title +
                '\n' +
                header +
                '\n' +
                data.join('\n') +
                '\n';

            return totalPolicy;
        });
        const csvString = totalPolicies.join('\n');

        const link = document.createElement('a');
        link.download = 'הפקדות מוכרות לפי קופות.csv';
        const universalBOM = "\uFEFF";
        link.href = `data:text/csv;charset=UTF-8,${universalBOM}${csvString}`;
        link.click();
    }

    const onClickExportReport = async () => {
        const apiUrl = `${GET_SERVER_URL()}/annuityPoliciesForm`;

        const response = await fetch(apiUrl, {
            credentials: "include",
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data: {
                    policiesTable,
                    userDetails
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

    return (
        <div>
            <Accordion>
                {generatePolicies()}
            </Accordion>
            <button className='btn btn-outline-info' onClick={onClickExportToCSV}>ייצא לאקסל</button>
            <button className='btn btn-outline-info' onClick={onClickExportReport}>הפרק דו"ח</button>
        </div>
    );
}

export default PartTwoResultsTable;
