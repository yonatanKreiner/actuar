import './InterestCalculator.css';

import React, {useState} from 'react';

import Header from './Header';
import DebtsTable from './DebtsTable';
import ResultItem from './ResultItem';

const InterestCalculator = () => {
	const date = new Date();

	const [debts, setDebts] = useState([
		{startDate: '01/01/2010', sum: 100, isLegalInterest: true, endDate: date.getDate() +'/'+date.getMonth()+'/'+date.getFullYear()},
		{startDate: '01/01/2020', sum: 100, isLegalInterest: true, endDate: date.getDate() +'/'+date.getMonth()+'/'+date.getFullYear()}
	]);

	const handleImportDebts = (debtsArr) => {
		setDebts(debtsArr);
	}

	const handleChangeDebt = (index, debt) => {
		console.log(debt);
		setDebts([
			...debts.slice(0, index), 
			debt, 
			...debts.slice(index + 1)
		]);
	}

	const handleAddDebt = (debt) => {
		setDebts([...debts, debt]);
	}

	const handleRemoveDebt = () => {
		setDebts(debts.slice(0, -1));
	}

	const handleCalculate = async () => {
		const results = [];
		const CHUNK = 2;
		for(let i=0; i < debts.length; i += CHUNK) {
			const debtsChunk = debts.slice(i, i + CHUNK);

			const requestData = { debts: debtsChunk };	
			const chunkResult = await calcDepts(requestData);
			results.push(...chunkResult);
		}

		const totalDebt = results.reduce((total, debtResult) => total + parseFloat(debtResult.totalDebt.replace(',','')), 0);

		setDebts([...results]);

		return {allDepts: results, total: totalDebt.toLocaleString(undefined,{ minimumFractionDigits: 2 })};
	}

	const calcDepts = async (requestData) => {
		const apiUrl = process.env.NODE_ENV === 'production' ? '/interest': 'http://localhost:7000/interest';

		const response = await fetch(apiUrl,{
			method: 'post',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(requestData)
		});

		const data = await response.json();
		const results = data.finalDebt;
		results.allDepts = results.allDepts.map(deptResult => { 
			return {
				...deptResult,
				interestType: deptResult.isLegalInterest ? "ריבית צמודה" : "ריבית פיגורים"
			}
		});

		return results.allDepts;
	}

	return (
		<div className='containter centered'>
			<Header/>
			<hr/>
			<DebtsTable 
				importDebts={handleImportDebts}
				handleChangeDebt={handleChangeDebt}
				addDebt={handleAddDebt} 
				removeDebt={handleRemoveDebt} 
				debts={debts} />
			<hr/>
			<ResultItem calculateDept={handleCalculate} />
		</div>
	);
}

export default InterestCalculator;
