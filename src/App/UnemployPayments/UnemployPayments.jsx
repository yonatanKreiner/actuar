import React, {useState} from 'react'; 

import Header from './Header';
import Query from './Query';
import Result from './Result';

 const UnemployPayments = () => {

    const basisDailySalary = 352;
    const basisAvgDailySalary = 422.04;
    const numOfWorkDaysInFiveMonths = 150;

    const [isParentOrAbove28, setIsParentOrAbove28] = useState(true);
    const [salaries, setSalaries] = useState([]);

    const setIsParentOrAbove28Func = (flag) => {
        setIsParentOrAbove28(flag);
    }

    const setAllSalaies = (salaries) => {
        setSalaries(salaries);
    }

    const calculateUnemploymentPayment = () => {
        const avgDaily = salaries.reduce((a,b) => a+b) / numOfWorkDaysInFiveMonths;
        let dailyAvgForCalc = avgDaily;
        
        let firstBaseCalc = 0;
        let secBaseCalc = 0;
        let thirdBaseCalc = 0;
        let forthBaseCalc = 0;

        const firstBase = dailyAvgForCalc > basisDailySalary * 0.5 ? basisDailySalary * 0.5  : dailyAvgForCalc ;
        firstBaseCalc = isParentOrAbove28 ? firstBase * 0.8 : firstBase * 0.6;
        dailyAvgForCalc -= basisDailySalary * 0.5;

        if(dailyAvgForCalc > 0){
            const secBase = dailyAvgForCalc > basisDailySalary * 0.25 ? basisDailySalary * 0.25 : dailyAvgForCalc;
            secBaseCalc = isParentOrAbove28 ? secBase * 0.5 : secBase * 0.4;
            dailyAvgForCalc -= basisDailySalary * 0.25;
        }
        
        if(dailyAvgForCalc > 0){
            const thirdBase = dailyAvgForCalc > basisDailySalary * 0.25 ? basisDailySalary * 0.25 : dailyAvgForCalc;
            thirdBaseCalc = isParentOrAbove28 ? thirdBase * 0.45 : thirdBase * 0.35;
            dailyAvgForCalc -= basisDailySalary * 0.25;
        }

        if(dailyAvgForCalc > 0){
            const forthBase = dailyAvgForCalc < basisDailySalary * 5 ? dailyAvgForCalc : basisDailySalary * 5;
            forthBaseCalc =  isParentOrAbove28 ? forthBase * 0.3 : forthBase * 0.25;
        }

        let totalPayment = firstBaseCalc + secBaseCalc + thirdBaseCalc + forthBaseCalc;
        
        // בדיקה שלא עולה על השכר הממוצע
        if(basisAvgDailySalary < totalPayment){
            totalPayment = basisAvgDailySalary;
        }

        console.log(totalPayment);

        return totalPayment;
    }

    return (
        <div>
            <Header></Header>
            <Query onChangeIsParentOrAbove28={setIsParentOrAbove28Func} setAllSalaries={setAllSalaies}></Query>
            <Result calcPayment={calculateUnemploymentPayment}></Result>
        </div>
    );
};

export default UnemployPayments;