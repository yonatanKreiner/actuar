import './Query.css';

import React, { useEffect } from 'react'; 

const $ = window.jQuery;

const Query = ({updateMonthsAmount, updateMonthSalary, updateCutDownPrecent}) => {

    const monthDiff = (d1, d2) => {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth();
		months += d2.getMonth();
		
        return months <= 0 ? 0 : months;
	}

	useEffect(() => {
		for(let i = 1; i<3; i++){
			let datePickerId = `datepicker${i}`;
			$('#' + datePickerId).datepicker({
				format: 'dd/mm/yyyy'
			});

			$('#' + datePickerId).change(() => {
				const startDateText = $('#datepicker1').val().split('/');
				const endDateText = $('#datepicker2').val().split('/');
				if(startDateText && endDateText){
					const startDate = new Date(`${startDateText[2]}-${startDateText[1]}-${startDateText[0]}`);
					const endDate = new Date(`${endDateText[2]}-${endDateText[1]}-${endDateText[0]}`);
					updateMonthsAmount(monthDiff(startDate,endDate));
				}
			});
		}
	  }, []);

	return (
		<div className="severnace-pay-contaner">
			<div className="row-conainer">
				<p>תאריך התחלת עבודה</p>
				<input id={'datepicker1'} className='datepicker-severance' />
			</div>
			<div className="row-conainer">
				<p>תאריך סיום עבודה</p>
				<input id={'datepicker2'} className='datepicker-severance' />
			</div>
			<div className="row-conainer">
				<p>שכר חודשי</p>
				<input type='number' className="form-text amoutpicker" onChange={e => updateMonthSalary(e.target.value)} min='0' />
			</div>
			<div className="row-conainer">
				<p>אחוז שהופרש לביטוח פנסיוני</p>
				<input type='number' className="form-text amoutpicker" onChange={e => updateCutDownPrecent(e.target.value)}  min='0' />
			</div>
		</div>
	);
};

export default Query;
