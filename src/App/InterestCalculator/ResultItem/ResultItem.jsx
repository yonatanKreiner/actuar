import './ResultItem.css';

import PropTypes from 'prop-types';
import React from 'react'; 
import ReactLoading from 'react-loading';
import { CSVLink } from "react-csv";
import ResultsTable from './ResultsTable';

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
									<CSVLink
										data={this.state.result.allDepts}
										headers={[
											{label: "חוב", key: "sum"},
											{label: "ריבית צמודה", key: "isLegalInterest"},
											{label: "מתאריך", key: "startDate"},
											{label: "עד תאריך", key: "endDate"},
											{label: "שווי הצמדה", key: "indexateSum"},
											{label: "שווי ריבית", key: "totalInterest"},
											{label: "סך הכל", key: "totalDebt"}
										]}
										filename={"פסיקת ריבית.csv"}
										className="btn btn-outline-info generate-pdf-btn"
										target="_blank"
									>
										ייצא לאקסל
									</CSVLink>
									{/* <ResultsTable allDepts={this.state.result.allDepts}></ResultsTable> */}
								</div> : <></>
				}
			</div>
		);
	}
}

ResultItem.propTypes = {
	calculateDept: PropTypes.func.isRequired,
	generatePDF: PropTypes.func.isRequired,
	exportToExcel: PropTypes.func.isRequired
}

export default ResultItem;
