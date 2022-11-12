import React, { useState, useEffect, useParams } from "react";

function FilterForm({
  removeDuplicateApplication,
  removeDuplicateAction,
  getLogIDValue,
  filterDataButton,
  getApplicationValue,
  getApplicationIDValue,
  getActionValue,
  getDateFromValue,
  getDateToValue
}) {

  return (
    <>
      <div className="d-flex justify-content-between flex-row align-items-center mt-5">
        <div className="mb-3">
          <label htmlFor="LogID" className="form-label">Log ID</label>
          <input className="form-control" id="LogID" type="text"
            placeholder="Log ID"
            onChange={ getLogIDValue } />
        </div>
        <div className="mb-3">
          <label htmlFor="ActionType" className="form-label">Action Type</label>
          <select className="form-select"
            onChange={ getActionValue }
            aria-label="Default select example">
            <option value=''>Action Type</option>
            {
              [...removeDuplicateAction].map((action, index) => {
                return (
                  action !== null ?
                    <option value={ action } key={ index }>
                      { action }
                    </option> : ''
                );
              })
            }
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="ApplicationType" className="form-label">Application Type</label>
          <select className="form-select" aria-label="Default select example" onChange={ getApplicationValue }>
            <option value="">Application Type</option>
            {
              [...removeDuplicateApplication].map((application, index) => {
                return (
                  application !== null && application !== undefined ? <option value={ application } key={ index }>
                    { application }
                  </option> : ''

                );
              })
            }
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="FromDate" className="form-label">From Date</label>
          <input className="form-control" type="date"
            pattern="\d{4}-\d{2}-\d{2}"
            onChange={ getDateFromValue }
            placeholder="From Date" />
        </div>
        <div className="mb-3">
          <label htmlFor="ToDate" className="form-label">To Date</label>
          <input className="form-control" type="date"
            onChange={ getDateToValue }
            pattern="\d{4}-\d{2}-\d{2}"
            placeholder="To Date" />
        </div>
        <div className="mb-3">
          <label htmlFor="ApplicationID" className="form-label">Application ID</label>
          <input className="form-control" type="text" id='applicationID'
            placeholder="Application ID" onChange={ getApplicationIDValue }
          />
        </div>
        <div className="mt-3">
          <button type='button' onClick={ filterDataButton } className='searchLogger'>Search Logger</button>
        </div>
      </div>
    </>
  );
}
export default FilterForm;