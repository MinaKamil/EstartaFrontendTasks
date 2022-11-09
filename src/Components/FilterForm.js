
function FilterForm(
	{
		removeDuplicateApplication,
		removeDuplicateAction,
		getEmployeeValue,
		filterDataButton,
		getApplicationValue,
		getApplicationIDValue,
		getActionValue,
		getDateFromValue,
		getDateToValue
	}) {
	return(
		<>
			<div className="d-flex justify-content-between flex-row align-items-center mt-5">
				<div className="mb-3">
					<label htmlFor="EmployeeName" className="form-label">Employee Name</label>
					<input className="form-control" id="employee" type="text"
					       placeholder="Employee Name"
					       onChange={getEmployeeValue}/>
				</div>
				<div className="mb-3">
					<label htmlFor="ActionType" className="form-label">Action Type</label>
					<select className="form-select"
					        onChange={getActionValue}
					        aria-label="Default select example">
						<option value=''>Action Type</option>
						{
							[...removeDuplicateAction].map((action,index) => {
								return (
									action !== null ?
									<option value={action} key={index}>
										{action}
									</option> : ''
								)
							})
						}
					</select>
				</div>
				<div className="mb-3">
					<label htmlFor="ApplicationType" className="form-label">Application Type</label>
					<select className="form-select" aria-label="Default select example" onChange={getApplicationValue}>
						<option value="">Application Type</option>
						{
							[...removeDuplicateApplication].map((application,index) => {
								return (
									application !== null && application !== undefined ? <option value={application} key={index}>
										{application}
									</option> : ''
								
								)
							})
						}
					</select>
				</div>
				<div className="mb-3">
					<label htmlFor="FromDate" className="form-label">From Date</label>
					<input className="form-control" type="date"
					       onChange={getDateFromValue}
					       placeholder="From Date" />
				</div>
				<div className="mb-3">
					<label htmlFor="ToDate" className="form-label">To Date</label>
					<input className="form-control" type="date" onChange={getDateToValue} placeholder="To Date" />
				</div>
				<div className="mb-3">
					<label htmlFor="ApplicationID" className="form-label">Application ID</label>
					<input className="form-control" type="text" id='applicationID'
					       placeholder="Application ID" onChange={getApplicationIDValue}
					       />
				</div>
				<div className="mt-3">
					<button type='button' onClick={filterDataButton}  className='searchLogger'>Search Logger</button>
				</div>
			</div>
		</>
	)
}
export default FilterForm;