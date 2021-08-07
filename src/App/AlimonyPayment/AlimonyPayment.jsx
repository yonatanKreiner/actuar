import './AlimonyPayment.css';

import React, {useEffect, useState} from 'react';
import ChilrenTable from './ChilrenTable';

const AlimonyPayment = () => {

	const children = [
		{date: '25/2/1999', sum: 1000, adultPrecent: 0.3, gender: 'male'},
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
				children={children} />
			<hr/>

        </div>
    );
}

export default AlimonyPayment;
