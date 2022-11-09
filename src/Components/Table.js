import { useMemo, useState} from "react";
import Pagination from "./Pagination";

const useSortableData = (items, config = null) => {
	const [sortConfig, setSortConfig] = useState(config);
	
	const sortedItems = useMemo(() => {
		let sortableItems = [...items];
		if (sortConfig !== null) {
			sortableItems.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === 'ascending' ? -1 : 1;
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === 'ascending' ? 1 : -1;
				}
				return 0;
			});
		}
		return sortableItems;
	}, [items, sortConfig]);
	
	const requestSort = (key) => {
		let direction = 'ascending';
		if (
			sortConfig &&
			sortConfig.key === key &&
			sortConfig.direction === 'ascending'
		) {
			direction = 'descending';
		}
		setSortConfig({ key, direction });
	};
	
	return { items: sortedItems, requestSort, sortConfig };
};

const Table = ({dataList,currentPage,dataLenth,tableLimit,setDataPaginagtion}) => {
	const { items, requestSort, sortConfig } = useSortableData(dataList);
	const getClassNamesFor = (name) => {
		if (!sortConfig) {
			return;
		}
		return sortConfig.key === name ? sortConfig.direction : undefined;
	};
	return (
		<>
			<table className="table table-bordered mt-3">
				<thead>
				<tr>
					<th>
						<button
							type="button"
							onClick={() => requestSort('logId')}
							className={`${getClassNamesFor('logId')} btn border-0 w-100 d-block`}
						>
							Log ID <i className="fa-solid fa-arrow-down-short-wide"></i>
						</button>
					</th>
					<th>
						<button
							type="button"
							onClick={() => requestSort('applicationType')}
							className={`${getClassNamesFor('applicationType')} btn border-0 w-100 d-block`}
						>
							Application Type <i className="fa-solid fa-arrow-down-short-wide"></i>
						</button>
					</th>
					<th>
						<button
							type="button"
							onClick={() => requestSort('applicationId')}
							className={`${getClassNamesFor('applicationId')} btn border-0 w-100 d-block`}
						>
							Application ID <i className="fa-solid fa-arrow-down-short-wide"></i>
						</button>
					</th>
					<th>
						<button
							type="button"
							onClick={() => requestSort('actionType')}
							className={`${getClassNamesFor('actionType')} btn border-0 w-100 d-block`}
						>
							Action <i className="fa-solid fa-arrow-down-short-wide"></i>
						</button>
					</th>
					<th>
						<button
							type="button"
							onClick={() => requestSort('logInfo')}
							className={`{getClassNamesFor('logInfo')} btn border-0 w-100 d-block`}
						>
							Action Details <i className="fa-solid fa-arrow-down-short-wide"></i>
						</button>
					</th>
					<th>
						<button
							type="button"
							onClick={() => requestSort('creationTimestamp')}
							className={`${getClassNamesFor('creationTimestamp')} btn border-0 w-100 d-block`}
						>
							Date:time <i className="fa-solid fa-arrow-down-short-wide"></i>
						</button>
					</th>
				</tr>
				</thead>
				<tbody>
				{ items.length > 0 ?
					items.map((item) => (
					<tr key={item.logId}>
						<td>{item.logId}</td>
						<td>{item.applicationType!== null ?
							item.applicationType.replaceAll('_', ' ').charAt(0).toUpperCase() +
							item.applicationType.replaceAll('_', ' ').slice(1).toLowerCase():''}</td>
						<td>{item.applicationId}</td>
						<td>{item.actionType.replaceAll('_', ' ').charAt(0).toUpperCase() +
							item.actionType.replaceAll('_', ' ').slice(1).toLowerCase()}</td>
						<td>{item.source}</td>
						<td>{item.creationTimestamp.split(' ').join(' / ')}</td>
					</tr>
					)): <tr className='text-center'><td colSpan={ 6 }>No Data</td></tr>}
				</tbody>
			</table>
			{
				dataLenth > tableLimit ? <Pagination tableLimit={ tableLimit } dataLenth={ dataLenth } currentPage={ currentPage } setDataPaginagtion={ setDataPaginagtion }/> :''
			}
		</>
	);
};
export default Table;