import {useEffect, useState} from "react";
import './App.css';
import Table from './Components/Table'
import FilterForm from "./Components/FilterForm";

import axios from "axios";

function App() {
	const [data, setData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [dataLenth, setDataLenth] = useState(data.length);
	const tableLimit = 10;
	const [dataList,setDataList]=useState(data.slice(0,tableLimit));
	const [inputLogID, setInputLogID] = useState('');
	const [selectApplication,setSelectApplication]=useState('')
	const [selectAction,setSelectAction]=useState('')
	const [inputFromDate,setInputFromDate]=useState('')
	const [inputToDate,setInputToDate]=useState('')
	const [inputApplicationID,setInputApplicationID]=useState('')
	const [removeDuplicateApplication,setRemoveDuplicateApplication] = useState(new Set());
	const [removeDuplicateAction,setRemoveDuplicateAction] = useState(new Set());
	let result = async () => {
		const response = await axios(
			"https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f"
		).then((response) =>{
			// gat all data
			setData(response.data.result.auditLog);
			// get data length
			setDataLenth(response.data.result.auditLog.length);
			// set data to limit 10 per page
			setDataList(response.data.result.auditLog.slice(0,tableLimit));
			
			// remove duplicated data for application type select
			setRemoveDuplicateApplication( new Set(response.data.result.auditLog.map(key => {
				if (key.applicationType !== null)
					return key.applicationType.replaceAll('_', ' ').charAt(0).toUpperCase() + key.applicationType.replaceAll('_', ' ').slice(1).toLowerCase();
			})))
			// remove duplicated data for action type select
			setRemoveDuplicateAction( new Set(response.data.result.auditLog.map(key => {
				return key.actionType.replaceAll('_', ' ').charAt(0).toUpperCase() + key.actionType.replaceAll('_', ' ').slice(1).toLowerCase();
			})))
		}).catch((e)=>{
			console.log('error connection')
		});
	};
	useEffect(() => {
		result();
	}, []);
	function setDataPaginagtion(active) {
		setCurrentPage(active);
		setDataLenth(data.length)
		setDataList(data.slice(((active-1) * tableLimit),((active-1) * tableLimit + tableLimit)))
	}
	
	//get input value for employee Name
	const getLogIDValue = (e) => {
		setInputLogID(e.target.value);
	};
	//get select value for application type
	const getApplicationValue = (e) => {
		setSelectApplication(e.target.value)
	}
	//get select value for action type
	const getActionValue = (e) => {
		setSelectAction(e.target.value)
	}
	//get input value for application ID
	const getApplicationIDValue = (e) => {
		setInputApplicationID(e.target.value);
	};
	const getDateFromValue = (e) => {
		setInputFromDate(e.target.value);
	};
	const getDateToValue = (e) => {
		setInputToDate(e.target.value);
	};
	const filterDataButton = (e) =>{
		e.preventDefault();
		if (inputLogID.length !== null && inputLogID !== ''){
				setDataList(data.filter((el)=> el.logId !== null ? el.logId.toString().includes(inputLogID.toString()):''));
		}
		if (selectAction.length !== null && selectAction !== ''){
			setDataList(data.filter((el)=> el.actionType !== null? el.actionType.replaceAll('_', ' ').toLowerCase().includes(selectAction.toLowerCase()):''));
		}
		if (selectApplication.length !== null && selectApplication !== ''){
			setDataList(data.filter((el)=> el.applicationType !== null? el.applicationType.replaceAll('_', ' ').toLowerCase().includes(selectApplication.toLowerCase()):''));
		}
		if(inputFromDate.length !== null && inputFromDate !== ''){
			setDataList(data.filter((el,index)=>  el.creationTimestamp.split(' ')[0].toString() <  inputFromDate.toString()));
		}
		if(inputToDate.length !== null && inputToDate !== ''){
			setDataList(data.filter((el,index)=>  el.creationTimestamp.split(' ')[0].toString() > inputToDate.toString()));
		}
		if(inputApplicationID.length !== null && inputApplicationID !== ''){
			setDataList(data.filter((el)=> el.applicationId !== null ? el.applicationId.toString().includes(inputApplicationID.toString()):''));
		}
	};

	return (
		<div className="container">
			<FilterForm removeDuplicateApplication={removeDuplicateApplication}
			            removeDuplicateAction={removeDuplicateAction}
			            filterDataButton={filterDataButton}
			            getLogIDValue={getLogIDValue}
			            getApplicationValue={getApplicationValue}
			            getActionValue={getActionValue}
			            getApplicationIDValue={getApplicationIDValue}
			            getDateFromValue={getDateFromValue}
			            getDateToValue={getDateToValue}
			            
			/>
			<Table  currentPage={currentPage}
			        dataLenth={dataLenth}
			        dataList={dataList}
			        tableLimit={tableLimit}
			        setDataPaginagtion={setDataPaginagtion}
			/>
		</div>
	);
}

export default App;
