import React from 'react';
import './MyPagination.css';
import Pagination from '@material-ui/lab/Pagination';

const MyPagination = ({setPage, numOfPage = 10 }) => {
   const handlePageChange = (page) => {
     setPage(page);
     window.scroll(0,0);
   };

  return (
    <div>
      <Pagination className='Mypagination_part' count={numOfPage} onChange={(e)=>handlePageChange(e.target.textContent)} shape="rounded" />
    </div>
  )
}

export default MyPagination