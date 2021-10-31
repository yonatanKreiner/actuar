import './ResultItem.css';

import PropTypes from 'prop-types';
import React from 'react'; 
import ReactLoading from 'react-loading';
import ResultsTable from './ResultsTable';

const $ = window.jQuery;

class ResultItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			result: null,
			isLoading: false
		}
	}
	
	async onClickCalculate(){
		this.setState({
			isLoading: true,
		});
		const finalDebt = await this.props.calculateDept();	

		this.setState({
			result: finalDebt,
			isLoading: false
		});
	}

	async onClickGeneratePDF() {
		this.setState({
			isLoading: true,
		});

		await this.props.generatePDF();

		this.setState({
			isLoading: false
		});
	}

	render() {
		return (
			<div className='result-block'>
				<button type='button' onClick={() => this.onClickCalculate()} className='btn-result btn btn-primary'>חשב</button>
				<br />
				{this.state.isLoading ? <ReactLoading className="loader" color={'#2196F3'} /> : 
						this.state.result ? 
								<div className="result-data-container">
									<div>
										<h1 id='resultElement'>סה"כ חוב</h1>
										<h1 id='resultElement'>{this.state.result.total}</h1>
									</div>
									<button type='button' onClick={() => this.onClickGeneratePDF()} className='btn btn-outline-info generate-pdf-btn'>הפק דו"ח</button>
									{/* <ResultsTable allDepts={this.state.result.allDepts}></ResultsTable> */}
								</div> : <></>
				}
			</div>
		);
	}
}

ResultItem.propTypes = {
	calculateDept: PropTypes.func.isRequired,
	generatePDF: PropTypes.func.isRequired
}

export default ResultItem;
