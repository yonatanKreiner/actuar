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

		this.handleChangeDebtDate = this.handleChangeDebtDate.bind(this);
		this.handleChangeDebtSum = this.handleChangeDebtSum.bind(this);
		this.handleAddDebt = this.handleAddDebt.bind(this);
		this.handleRemoveDebt = this.handleRemoveDebt.bind(this);
		this.handleCalculate = this.handleCalculate.bind(this);
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
		const requestData = {calculationDate: resultDate, debts: this.state.debts, isLegalInterest};

		const apiUrl = process.env.NODE_ENV === 'production' ? '/interest': 'http://localhost:7000/interest';

		const response = await fetch(apiUrl,{
			method: 'post',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(requestData)
		});

		const data = await response.json();
		return data.finalDebt;
	}

	render() {
		return (
			<div className='containter centered'>
				<Header/>
				<hr/>
				<DebtsTable changeDebtDate={this.handleChangeDebtDate}
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
