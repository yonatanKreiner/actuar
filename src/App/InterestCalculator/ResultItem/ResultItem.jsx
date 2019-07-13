import './ResultItem.css';

import PropTypes from 'prop-types';
import React from 'react'; 

const $ = window.jQuery;

class ResultItem extends React.Component {
	constructor(props) {
		super(props);
		let date = new Date();
		this.state = {
			calculationDate:  date.getDate() +'/'+date.getMonth()+'/'+date.getFullYear(),
			result: 0
		}
		this.changeCalculationDate.bind(this);
	}

	componentDidMount(){
		let datePickerId = 'datepicker';
		$('#' + datePickerId).datepicker({
			format: 'dd/mm/yyyy'
		});

		$('#' + datePickerId).change(() => this.changeCalculationDate($('#' + datePickerId).val()));

		return this.render();
	}

	changeCalculationDate(date) {
		this.setState(prevState => ({
			calculationDate: date,
			result: prevState.result
		}));
	}
	
	async onClickCalculate(){
		let date = $('#datepicker').val();
		let finalDebt = await this.props.calculateDept(date);
		console.log(finalDebt);
	}

	render() {
		return (
			<div className='result-block'>
				<div className='row'>
					<input  id='datepicker' className='datepicker' value={this.state.calculationDate} />
					<button type='button' onClick={() => this.onClickCalculate()} className='btn-result btn btn-primary'>חשב</button><br />
				</div>
				<h1 id='resultElement'>{this.state.result}</h1>
			</div>
		);
	}
}

ResultItem.propTypes = {
	calculateDept: PropTypes.func.isRequired
}

export default ResultItem;
