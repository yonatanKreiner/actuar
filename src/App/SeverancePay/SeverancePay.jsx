import React,{useState} from 'react'; 

import Header from './Header';
import Query from './Query';
import Result from './Result';

 const SeverancePay = () => {
    const SEVERANCE_PRECENT = 0.08333;

    
    const [monthlySalry, setMonthlySalary] = useState(0);
    const [cutdownPrecent, setCutDownPrecent] = useState(0);
    const [monthsAmount, setMonthsAmount] = useState(0);

    const calcSeverance = (monthlySalary, cutdownPrecent) => {
        const calcedSeveragePrecent = SEVERANCE_PRECENT - (cutdownPrecent / 100);
        const calcedMonthlyPayment =  (monthlySalary * calcedSeveragePrecent);

        return (calcedMonthlyPayment > 0 ? calcedMonthlyPayment : 0);
    }

    return (
        <div>
            <Header></Header>
            <Query updateMonthsAmount={setMonthsAmount} updateMonthSalary={setMonthlySalary} updateCutDownPrecent={setCutDownPrecent}></Query>
            <Result calcSeverance={calcSeverance} monthlySalary={monthlySalry} cutdownPrecent={cutdownPrecent} monthsAmount={monthsAmount}></Result>
        </div>
    );
};

export default SeverancePay;