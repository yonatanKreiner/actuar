import React from 'react';
import 'react-accessible-accordion/dist/fancy-example.css';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import { useState } from 'react';

const PartTwoTablePayload = () => {

    const [policiesTable, setPoliciesTable] = useState([]);

    const insertPolicy = () => {
        const newPolicy = {
            name: '',
            id: '',
            type: '',
            order: policiesTable.length,
            deposits: []
        }

        setPoliciesTable([...policiesTable, newPolicy]);
    }

    const removePolicy = () => {
        let newPolicies = [...policiesTable]
        newPolicies = newPolicies.slice(0, newPolicies.length - 1)
        setPoliciesTable(newPolicies);
    }

    const addDeposit = () => {

    }

    const generateDeposits = (policy, index) => {
        return (
            policy.deposits.map(d => (
                <tr>
                    <td>
                        <input value={d.year} type='number' />
                    </td>
                    <td>
                        <input value={d.depositeEmpoloyee} />
                    </td>
                    <td>
                        <input value={d.depositeCompany} />
                    </td>
                    <td>
                        <input value={d.depositeCompensation} />
                    </td>
                </tr>)
            )
        )
    }

    const generatePolicies = () => {
        return policiesTable.map((p, index) => {
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
                                        <input value={p.name} />
                                    </td>
                                    <td>
                                        <input value={p.id} />
                                    </td>
                                    <td>
                                        <input value={p.type} />
                                    </td>
                                    <td>
                                        <input value={p.order} type='number' />
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
                                <th>עובד</th>
                                <th>מעסיק</th>
                                <th>פיצויים</th>
                            </thead>
                            <tbody>
                                {generateDeposits(p, index)}
                            </tbody>
                        </table>
                        <button className='btn btn-outline-warning' onClick={() => {
                            const newPolicies = [...policiesTable];
                            newPolicies[index].deposits.push({
                                year: 0,
                                depositeEmpoloyee: 0,
                                depositeCompany: 0,
                                depositeCompensation: 0
                            })

                            setPoliciesTable(newPolicies);
                        }}>
                            הוסף שורה</button>
                        <button className='btn btn-outline-warning' onClick={() => {
                            let newPolicies = [...policiesTable]
                            const newDeposits = newPolicies[index].deposits.slice(0, newPolicies[index].deposits.length - 1)
                            newPolicies[index].deposits = newDeposits;
                            setPoliciesTable(newPolicies);
                        }}>מחק שורה</button>
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

            <button className='btn btn-outline-warning' onClick={insertPolicy}>הוסף קופה</button>
            <button className='btn btn-outline-warning' onClick={removePolicy}>מחק קופה</button>
        </div>
    );
}

export default PartTwoTablePayload;
