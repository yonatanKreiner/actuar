import './AlimonyPayment.css';

import React, {useEffect, useState} from 'react';
import ChilrenTable from './ChilrenTable';

const AlimonyPayment = () => {
	const [children, setChildren] = useState([
		{date: '25/2/1999', sum: 1000, adultPrecent: 0.3, gender: 'male'},
	]);

	const handleChange = (index, child) => {
		setChildren([...children.slice(0,index), child, ...children.slice(index+1)]);
	}

	const handleAddChild = () => {
		setChildren([...children, {date: '01/01/2000', sum: 1000, adultPrecent: 0.3, gender: 'male'}]);
	}

	const handleRemoveChild = () => {
		setChildren(children.slice(0,-1));
	}

    return (
        <div className='alimony-payment-container'>
            חישוב דמי מזונות

            <hr/>
			<ChilrenTable  
				changeChild={handleChange}
				addChild={handleAddChild} 
				removeChild={handleRemoveChild} 
				children={children} />
			<hr/>

        </div>
    );
}

export default AlimonyPayment;
