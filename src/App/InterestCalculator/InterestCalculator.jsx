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
				{date: '25/2/1990', sum: 100},
				{date: '25/2/1994', sum: 200}
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
				{date: prevState.debts[index].date, sum: sum}, 
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

	handleCalculate(resultDate){
		const requestData = {calculationDate: resultDate, debts: this.state.debts};

		fetch('http://localhost:7001',{
			method: 'post',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(requestData)
		}).then(response => response.finalDebt);
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
