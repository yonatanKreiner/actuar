import React from 'react';
import 'react-accessible-accordion/dist/fancy-example.css';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

const PartTwoTablePayload = () => {

    return (
        <div>
            <Accordion>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <table style={{direction:"rtl"}} className="table">
                                <thead>
                                    <th>קופה</th>
                                    <th>מס תוכנית/פוליסה</th>
                                    <th>סוג</th>
                                    <th>מדרג</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input/>
                                        </td>
                                        <td>
                                            <input/>
                                        </td>
                                        <td>
                                            <input/>
                                        </td>
                                        <td>
                                            <input/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                       <table  style={{direction:"rtl"}} className="table">
                            <thead className="thead-light">
                                <th>שנת מס</th>
                                <th>עובד</th>
                                <th>מעסיק</th>
                                <th>פיצויים</th>
                            </thead>
                            <tbody>
                                
                            </tbody>
                       </table>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            Is free will real or just an illusion?
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <p>
                            In ad velit in ex nostrud dolore cupidatat consectetur
                            ea in ut nostrud velit in irure cillum tempor laboris
                            sed adipisicing eu esse duis nulla non.
                        </p>
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default PartTwoTablePayload;
