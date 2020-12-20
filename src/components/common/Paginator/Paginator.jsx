import React, { useState } from 'react' 
import { Pagination } from '@material-ui/lab';

const Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pagesSize)
    return <Pagination  
        page={props.currentPage}
        count={pagesCount}
        pageSize={props.pageSize}
        onChange={(event, value) => props.onChangeCurrentPage(value)}
    /> 
}

export default Paginator

