import React from 'react';
import 'react-accessible-accordion/dist/fancy-example.css';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

const PartTwoResultsTable = ({policiesTable}) => {

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
                                <th>מעסיק פטור ממס</th>
                                <th>מעסיק לא פטור ממס</th>
                                <th>פיצויים פטור ממס</th>
                                <th>פיצויים לא פטור ממס</th>
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

    return (
        <div>
            <Accordion>
                {generatePolicies()}
            </Accordion>
        </div>
    );
}

export default PartTwoResultsTable;
