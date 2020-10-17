import React,{useState} from 'react'; 

import './Result.css';

const Result = ({calcSeverance, monthlySalary,cutdownPrecent, monthsAmount}) => {
    const [monthlySeverance, setMonthlySeverance] = useState(0);

    const onClickCalc = () => {
        setMonthlySeverance(calcSeverance(monthlySalary, cutdownPrecent));
    }

    return (
        <div className="severnace-pay-contaner">
            <div className="result-container">
            <button type='button' onClick={onClickCalc} className='btn-result btn btn-primary'>חשב</button>

            {monthsAmount != 0 && monthlySeverance ? <p>סך הפיצויים שלך הם {monthlySeverance.toFixed(2)} ש"ח לחודש.<br/>
                עבור {monthsAmount} חודשי עבודה <br />
               כלומר סה"כ הפיצויים הם <b>כ-{(monthlySeverance * monthsAmount).toFixed(2)} ש"ח </b>
            </p>
             : <></>}
            </div>
        </div>
    )
};

export default Result;