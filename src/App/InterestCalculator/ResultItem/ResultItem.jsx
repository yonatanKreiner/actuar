import './ResultItem.css';

import PropTypes from 'prop-types';
import React from 'react'; 
import ReactLoading from 'react-loading';
import ResultsTable from './ResultsTable';

const $ = window.jQuery;

class ResultItem extends React.Component {
	constructor(props) {
		super(props);
		let date = new Date();
		this.state = {
			calculationDate:  date.getDate() +'/'+date.getMonth()+'/'+date.getFullYear(),
			result: null,
			isLoading: false
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
		this.setState({
			isLoading: true,
		});
		const date = $('#datepicker').val();
		const isLegalInterest = document.getElementById('legalInterestRadio').checked;
		const finalDebt = await this.props.calculateDept(date, isLegalInterest);	

		this.setState({
			result: finalDebt,
			isLoading: false
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
					<input  id='datepicker' className='datepicker' onChange={(e)=>this.changeCalculationDate(e.target.value)} value={this.state.calculationDate} />
					<button type='button' onClick={() => this.onClickCalculate()} className='btn-result btn btn-primary'>חשב</button><br />
				</div>
				{this.state.isLoading ? <ReactLoading className="loader" color={'#2196F3'} /> : 
						this.state.result ? 
								<div className="result-data-container">
									<div>
										<h1 id='resultElement'>סה"כ חוב</h1>
										<h1 id='resultElement'>{this.state.result.total}</h1>
									</div>
									<ResultsTable allDepts={this.state.result.allDepts}></ResultsTable>
								</div> : <></>
				}
			</div>
		);
	}
}

ResultItem.propTypes = {
	calculateDept: PropTypes.func.isRequired
}

export default ResultItem;
