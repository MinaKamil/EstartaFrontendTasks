function Pagination({ tableLimit, dataLenth, currentPage, setDataPaginagtion }) {
	const num_pages = Math.ceil(dataLenth / tableLimit);
	const pages = [];
	for (let index = 1; index <= num_pages; index++) {
		if (index === currentPage) {
			const button = <button type="button" key={ index } onClick={ () => setDataPaginagtion(index) } className={ `btn btn-outline-secondary border-0 active rounded-1` }>{ index  }</button>;
			pages.push(button);
		} else {
			const button = <button type="button" key={ index } onClick={ () => setDataPaginagtion(index) } className={ `btn btn-outline-secondary border-0 rounded-1` }>{ index}</button>;
			pages.push(button);
		}
	}
	
	return (
		<div className={ `btn-toolbar mt-4 justify-content-center mb-3` }
		     role="toolbar"
		     aria-label="Toolbar with button groups">
			<div className={ `btn-group rounded-0` } role="group" aria-label="First group">
				<button type="button" onClick={ () => {setDataPaginagtion(currentPage - 1); } } disabled={currentPage <= 1 ? true : false} className={ `btn btn-outline-secondary border-0 rounded-1` }><i className="fa-solid fa-angle-left"></i></button>
				{ pages }
				<button type="button" onClick={ () => setDataPaginagtion(currentPage + 1) } disabled={currentPage >= num_pages ? true : false} className={ `btn btn-outline-secondary border-0 rounded-1` }><i className="fa-solid fa-angle-right"></i></button>
			</div>
		</div>
	);
}

export default Pagination;