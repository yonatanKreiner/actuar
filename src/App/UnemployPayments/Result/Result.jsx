import React,{useState} from 'react'; 

import './Result.css';

const Result = ({calcPayment}) => {
    const [dailyPayment, setDailyPayment] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    const onClickCalc = () => {
        const dailyPayment = calcPayment();
        setDailyPayment(dailyPayment.toFixed(2));
        setMonthlyPayment((dailyPayment * 25).toFixed(2));
    }

    return (
        <div className="unemploy-container">
            <div className="result-container">
            <button type='button' onClick={onClickCalc} className='btn-result btn btn-primary'>חשב</button>

            <p>השכר היומי המשוערך שלך הוא {dailyPayment} שח <br/>
                והשכר החודשי הוא <b>כ-{monthlyPayment} שח</b>
            </p>
            </div>
        </div>
    )
};

export default Result;