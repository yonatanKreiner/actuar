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
	}

	changeCalculationDate(date) {
		this.setState({
			calculationDate: date,
		});
	}
	
	async onClickCalculate(){
		const date = $('#datepicker').val();
		const isLegalInterest = document.getElementById('legalInterestRadio').checked;
		const finalDebt = await this.props.calculateDept(date, isLegalInterest);
		this.setState({
			result: finalDebt.toFixed(2),
		});
	}

	render() {
		return (
			<div className='result-block'>
				<div className='radio-block'>
					<div class="custom-control custom-radio">
						<input type="radio" class="custom-control-input" id="legalInterestRadio" name="interestRadioGroup" checked />
						<label class="custom-control-label" for="legalInterestRadio">ריבית חוקית</label>
					</div>
					<div class="custom-control custom-radio">
						<input type="radio" class="custom-control-input" id="illegalInterestRadio" name="interestRadioGroup" />
						<label class="custom-control-label" for="illegalInterestRadio">ריבית פיגורים</label>
					</div>
				</div>
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
