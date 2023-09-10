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
import { GET_SERVER_URL } from '../../config';
import PartTwoResultsTable from './PartTwoResultsTables';

const PartTwoTablePayload = () => {

    const [policiesTable, setPoliciesTable] = useState([]);
    const [policiesResultsTable, setPoliciesResultsTable] = useState(null);

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

    const calculatePoliciesTableResults = async () => {
        const apiUrl = `${GET_SERVER_URL()}/annuitiesPoliciesCalculation`;

        const response = await fetch(apiUrl, {
            credentials: "include",
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ policiesTable })
        });

        console.log(response);
        const data = await response.json();
        setPoliciesResultsTable(data.result)
    }

    const generateDeposits = (policy, index) => {
        return (
            policy.deposits.map((d, dIndex) => (
                <tr>
                    <td>
                        <input value={d.year} type='number'
                            onChange={(e) => {
                                let newPolicies = [...policiesTable]
                                const updatePolicy = newPolicies[index];
                                updatePolicy.deposits[dIndex].year = e.target.value;
                                setPoliciesTable(newPolicies);
                            }} />
                    </td>
                    <td>
                        <input value={d.depositeEmpoloyee} type='number'
                            onChange={(e) => {
                                let newPolicies = [...policiesTable]
                                const updatePolicy = newPolicies[index];
                                updatePolicy.deposits[dIndex].depositeEmpoloyee = e.target.value;
                                setPoliciesTable(newPolicies);
                            }} />
                    </td>
                    <td>
                        <input value={d.depositeCompany} type='number'
                            onChange={(e) => {
                                let newPolicies = [...policiesTable]
                                const updatePolicy = newPolicies[index];
                                updatePolicy.deposits[dIndex].depositeCompany = e.target.value;
                                setPoliciesTable(newPolicies);
                            }} />
                    </td>
                    <td>
                        <input value={d.depositeCompensation} type='number'
                            onChange={(e) => {
                                let newPolicies = [...policiesTable]
                                const updatePolicy = newPolicies[index];
                                updatePolicy.deposits[dIndex].depositeCompensation = e.target.value;
                                setPoliciesTable(newPolicies);
                            }} />
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
                                <td>קופה</td>
                                <td>מס תוכנית/פוליסה</td>
                                <td>(בסיסי/רגילה) סוג</td>
                                <td>מדרג</td>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input value={p.name} onChange={(e) => {
                                            let newPolicies = [...policiesTable]
                                            const updatePolicy = newPolicies[index];
                                            updatePolicy.name = e.target.value;
                                            setPoliciesTable(newPolicies);
                                        }} />
                                    </td>
                                    <td>
                                        <input value={p.id} onChange={(e) => {
                                            let newPolicies = [...policiesTable]
                                            const updatePolicy = newPolicies[index];
                                            updatePolicy.id = e.target.value;
                                            setPoliciesTable(newPolicies);
                                        }} />
                                    </td>
                                    <td>
                                        <input value={p.type} onChange={(e) => {
                                            let newPolicies = [...policiesTable]
                                            const updatePolicy = newPolicies[index];
                                            updatePolicy.type = e.target.value;
                                            setPoliciesTable(newPolicies);
                                        }} />
                                    </td>
                                    <td>
                                        <input value={p.order} type='number' onChange={(e) => {
                                            let newPolicies = [...policiesTable]
                                            const updatePolicy = newPolicies[index];
                                            updatePolicy.order = e.target.value;
                                            setPoliciesTable(newPolicies);
                                        }} />
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
                                year: newPolicies[index].deposits.length > 0 ? newPolicies[index].deposits[newPolicies[index].deposits.length - 1].year + 1 : new Date().getFullYear(),
                                depositeEmpoloyee: newPolicies[index].deposits.length > 0 ? newPolicies[index].deposits[newPolicies[index].deposits.length - 1].depositeEmpoloyee : 0,
                                depositeCompany: newPolicies[index].deposits.length > 0 ? newPolicies[index].deposits[newPolicies[index].deposits.length - 1].depositeCompany : 0,
                                depositeCompensation: newPolicies[index].deposits.length > 0 ? newPolicies[index].deposits[newPolicies[index].deposits.length - 1].depositeCompensation : 0,
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

            <button className='btn btn-info' style={{ width: 'fit-content' }} onClick={calculatePoliciesTableResults}>חישוב טבלאות קופות</button>
            {policiesResultsTable ? <PartTwoResultsTable policiesTable={policiesResultsTable} /> : <></>}
        </div>
    );
}

export default PartTwoTablePayload;
