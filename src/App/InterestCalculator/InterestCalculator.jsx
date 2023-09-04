import './InterestCalculator.css';

import React, { useState, useEffect } from 'react';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useSnackbar } from 'react-simple-snackbar'

import { GET_SERVER_URL } from '../config';
import Header from './Header';
import DebtsTable from './DebtsTable';
import ResultItem from './ResultItem';

const InterestCalculator = () => {

	const [debts, setDebts] = useState([
		{ startDate: new Date(), sum: 100, interestType: 'legal-interest', endDate: new Date() }
	]);

	const [openSnackbar] = useSnackbar()

	useEffect(() => {
		if (window.location.search.substr(1).includes("combackCalc")) {
			const payload = window.sessionStorage.getItem("interestCalculationImportPayload");
			const payloadData = JSON.parse(payload);
			setDebts(payloadData);
		} else {
			loadPayloadFromSessionStorage();
		}
	}, [])

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

	const handleRemoveAllDebt = () => {
		setDebts([]);
	}

	const sleep = time => new Promise(res => setTimeout(res, time, "done sleeping"));

	const handleCalculate = async () => {
		try {
			let resultsPromise = [];
			const CHUNK = 3;
			const results_arrays = [];

			for (let i = 0; i < debts.length; i += CHUNK) {
				const debtsChunk = debts.slice(i, i + CHUNK);

				const requestData = { debts: debtsChunk };
				const chunkResultPromise = calcDepts(requestData);
				resultsPromise.push(chunkResultPromise);

				if (resultsPromise.length % 6 == 0 || i+CHUNK >= debts.length) {
					const results_arrays_promise = Promise.all(resultsPromise);
					const resultsData = await results_arrays_promise
					results_arrays.push(resultsData.flat());
					resultsPromise = [];
					if(i+CHUNK < debts.length){
						await sleep(66000);	
					}
				}
			}

			const results = results_arrays.flat()

			const totalDebt = results.reduce((total, debtResult) => total + parseFloat(debtResult.totalDebt.replace(',', '')), 0);
			setDebts([...results]);
			savePayloadToSessionStorage([...results]);

			return { allDepts: results, total: totalDebt.toLocaleString(undefined, { minimumFractionDigits: 2 }) };
		} catch (err) {
			openSnackbar('החישוב נכשל, אנא נסה שנית או פנה לגורם טכני')
		}
	}

	const calcDepts = async (requestData) => {
		const apiUrl = `${GET_SERVER_URL()}`;

		const response = await fetch(apiUrl, {
			method: 'post',
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify(requestData)
		});

		const data = await response.json();
		const results = data.finalDebt;
		results.allDepts = results.allDepts.map(deptResult => {
			return {
				...deptResult,
				interestTypetext: deptResult.interestType === 'legal-interest' ? "ריבית צמודה" :
					deptResult.interestType === 'illegal-interest' ? "ריבית פיגורים" :
						deptResult.interestType === 'shekel-interest' ? "ריבית שקלית" : "הצמדה למדד"
			}
		});

		return results.allDepts;
	}

	const generatePDF = async () => {
		const input = document.getElementById('results-table');
		const resultTableCanvas = await html2canvas(input);
		const headerCanvas = await html2canvas(document.getElementById('interest-header'));
		const resultsImgData = resultTableCanvas.toDataURL('image/png');
		const headerImgData = headerCanvas.toDataURL('image/png');

		const pdf = new jsPDF("p", "mm", "a4");

		const imgProps = pdf.getImageProperties(resultsImgData);
		const width = pdf.internal.pageSize.getWidth();
		const height = (imgProps.height * width) / imgProps.width;

		const pageHeight = 295;
		let heightLeft = height;
		let position = 30;

		pdf.addImage(headerImgData, 'JPEG', -0.55 * width, 5);
		pdf.addImage(resultsImgData, 'JPEG', 2, 30, width - 4, height);
		heightLeft -= pageHeight;

		while (heightLeft >= 0) {
			position += heightLeft - height; // top padding for other pages
			pdf.addPage();
			pdf.addImage(resultsImgData, 'PNG', 0, position, width - 4, height);
			heightLeft -= pageHeight;
		}

		pdf.save("חישוב פסיקת ריבית.pdf");
	}

	const savePayloadToSessionStorage = (debtsPayload) => {
		const interestsPayload = {
			debts: debtsPayload
		};

		window.sessionStorage.setItem('interestPamentPayload', JSON.stringify(interestsPayload));
	}

	const loadPayloadFromSessionStorage = () => {
		const payload = window.sessionStorage.getItem("interestPamentPayload");
		if (payload) {
			const payloadData = JSON.parse(payload);
			setDebts(payloadData.debts);
		}
	}

	return (
		<div className='containter centered'>
			<Header />
			<hr />
			<DebtsTable
				importDebts={handleImportDebts}
				handleChangeDebt={handleChangeDebt}
				addDebt={handleAddDebt}
				removeDebt={handleRemoveDebt}
				removeAllDepts={handleRemoveAllDebt}
				debts={debts} />
			<hr />
			<ResultItem calculateDept={handleCalculate} generatePDF={generatePDF} />
		</div>
	);
}

export default InterestCalculator;
