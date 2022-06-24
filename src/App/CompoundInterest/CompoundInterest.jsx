import React, {useState} from 'react';
import IterestTable from './InterestTable';

import './CompoundInterest.css';

const CompoundInterest = () => {
    const [interests, setInterests] = useState([{
        date: new Date(),
        regularInterest: 1,
    }]);

    const addRow = () => {
        let newDate = new Date();
        if(interests.length > 0){
            newDate = new Date(interests[interests.length-1].date)
            newDate.setMonth(newDate.getMonth()+1);
        }
        setInterests([...interests, {date: newDate,regularInterest: 1}])
    }
    const removeRow = () => {
        setInterests(interests.slice(0,interests.length-1));
    }

    const changeRow = (interest, index) => {
        setInterests([...interests.slice(0,index),interest, ...interests.slice(index+1)]);
    }
    
    return (
        <div className='compound-interest-container'>
            <h4 id="calc-header">מחשבון ריבית דריבית</h4>
			<br/>
            <hr/>
			<div className='data-container'>
				<div>
                    <IterestTable 
                        interests={interests}
                        addRow={addRow}
                        removeRow={removeRow}
                        changeRow={changeRow}></IterestTable>
				</div>
			</div>
        </div>
    );
}

export default CompoundInterest;
