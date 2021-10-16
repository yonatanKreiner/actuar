import './InterestCalculator.css';

import React from 'react';

import Header from './Header';
import DebtsTable from './DebtsTable';
import ResultItem from './ResultItem';

class InterestCalculator extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			debts: [
				{date: '01/01/2010', sum: 100},
				{date: '01/01/2020', sum: 100}
			]
		};

		this.handleImportDebts = this.handleImportDebts.bind(this);
		this.handleChangeDebtDate = this.handleChangeDebtDate.bind(this);
		this.handleChangeDebtSum = this.handleChangeDebtSum.bind(this);
		this.handleAddDebt = this.handleAddDebt.bind(this);
		this.handleRemoveDebt = this.handleRemoveDebt.bind(this);
		this.handleCalculate = this.handleCalculate.bind(this);
	}

	handleImportDebts(debtsArr) {
		this.setState({debts: debtsArr});
	}

	handleChangeDebtDate(index, date) {
		this.setState(prevState => ({
			debts: [
				...prevState.debts.slice(0, index), 
				{date: date, sum: prevState.debts[index].sum}, 
				...prevState.debts.slice(index + 1)
			]
		}));
	}

	handleChangeDebtSum(index, sum) {
		this.setState(prevState => ({
			debts: [
				...prevState.debts.slice(0, index), 
				{date: prevState.debts[index].date, sum: parseFloat(sum)}, 
				...prevState.debts.slice(index + 1)
			]
		}));
	}

	handleAddDebt(debt) {
		this.setState(prevState => ({
			debts: [...prevState.debts, debt]
		}));
	}

	handleRemoveDebt() {
		this.setState(prevState => ({
			debts: prevState.debts.slice(0, -1)
		}))
	}

	async handleCalculate(resultDate, isLegalInterest){
		const results = [];
		const debts = this.state.debts;
		const CHUNK = 4;
		for(let i=0; i < debts.length; i += CHUNK){
			const debtsChunk = debts.slice(i, i + CHUNK);

			const requestData = {calculationDate: resultDate, debts: debtsChunk, isLegalInterest};	
			const chunkResult = await this.calcDepts(requestData);
			results.push(...chunkResult);
		}

		const totalDebt = results.reduce((total, debtResult) => total + parseFloat(debtResult.totalDebt.replace(',','')), 0);

		return {allDepts: results, total: totalDebt.toLocaleString(undefined,{ minimumFractionDigits: 2 })};
	}

	async calcDepts(requestData) {
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
				interestType: requestData.isLegalInterest ? "ריבית צמודה" : "ריבית פיגורים",
				endDate: requestData.calculationDate
			}
		});

		return results.allDepts;
	}

	render() {
		return (
			<div className='containter centered'>
				<Header/>
				<hr/>
				<DebtsTable 
					importDebts={this.handleImportDebts}
					changeDebtDate={this.handleChangeDebtDate}
					changeDebtSum={this.handleChangeDebtSum} 
					addDebt={this.handleAddDebt} 
					removeDebt={this.handleRemoveDebt} 
					debts={this.state.debts} />
				<hr/>
				<ResultItem calculateDept={this.handleCalculate} />
			</div>
		);
	}
}

export default InterestCalculator;
