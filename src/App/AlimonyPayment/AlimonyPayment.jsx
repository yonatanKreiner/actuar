import './AlimonyPayment.css';

import React, {useEffect, useState} from 'react';
import ChilrenTable from './ChilrenTable';

const AlimonyPayment = () => {

	const debts = [
		{date: '25/2/1990', sum: 100},
		{date: '25/2/1994', sum: 200}
	];

	const handleChangeDebtDate = (index, date) => {

	}

	const handleChangeDebtSum = (index, sum) => {

	}

	const handleAddDebt = (debt) => {

	}

	const handleRemoveDebt = () => {

	}

    return (
        <div className='alimony-payment-container'>
            חישוב דמי מזונות

            <hr/>
			<ChilrenTable  
				changeDebtDate={handleChangeDebtDate}
				changeDebtSum={handleChangeDebtSum} 
				addDebt={handleAddDebt} 
				removeDebt={handleRemoveDebt} 
				debts={debts} />
			<hr/>

        </div>
    );
}

export default AlimonyPayment;
