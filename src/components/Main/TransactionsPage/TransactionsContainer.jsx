import React from 'react'
import 'react-tippy/dist/tippy.css';
import { connect } from 'react-redux'
import { makeStyles, LinearProgress } from '@material-ui/core'
import { GridOverlay } from '@material-ui/data-grid'
import Transactions from './Transactions' 
import Paginator from '../../common/Paginator/Paginator'
import { 
    getAllTransactions, 
    getEditedTransactionData, 
    openEditModal
} from '../../../actions/transactions'
import { getEditedRemittanceData } from '../../../actions/remittance'

const useStyles = makeStyles((theme) => ({
    root: {
        overflow: 'visible',
        border: 0,
        color:
            theme.palette.type === 'light'
                ? 'rgba(0,0,0,.85)'
                : 'rgba(255,255,255,0.85)',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        WebkitFontSmoothing: 'auto',
        letterSpacing: 'normal',
        '& .MuiDataGrid-columnsContainer': {
            backgroundColor: theme.palette.type === 'light' ? '#fafafa' : '#1d1d1d',
        },
        '& .MuiDataGrid-iconSeparator': {
            display: 'none',
        },
        '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
            borderRight: `1px solid ${
                theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
                }`,
        },
        '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
            borderBottom: `1px solid ${
                theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
                }`,
        },
        '& .MuiDataGrid-cell': {
            color:
                theme.palette.type === 'light'
                    ? 'rgba(0,0,0,.85)'
                    : 'rgba(255,255,255,0.65)',
            cursor: 'pointer',
        },
        '& .MuiPaginationItem-root': {
            borderRadius: 0,
        },
    },
}))

function CustomLoadingOverlay() {
    return (
        <GridOverlay>
            <div style={{ position: 'absolute', top: 0, width: '100%' }}>
                <LinearProgress />
            </div>
        </GridOverlay>
    )
}

const TransactionsContainer = (props) => {
    const columns = [
        {
            field: 'actionDate',
            headerName: 'Дата',
            width: 110,
            sortable: false,
        },
        {
            field: 'transactionType',
            headerName: 'Тип',
            width: 100,
            sortable: false,
        },
        {
            field: 'sum',
            headerName: 'Сумма',
            width: 100,
            sortable: false,
        },
        {
            field: 'score',
            headerName: 'Счет',
            type: 'number',
            width: 130,
            sortable: false,
        },
        {
            field: 'targetEntity',
            headerName: 'Контрагент',
            width: 120,
            sortable: false,
        },
        {
            field: 'operationName',
            headerName: 'Категория',
            width: 220,
            sortable: false,
        },
        {
            field: 'projectName',
            headerName: 'Проект',
            width: 140,
            sortable: false,
        },
        // {
        //     field: 'description',
        //     headerName: 'Описание',
        //     width: 160,
        //     sortable: false,
        // },
    ]
    const CustomPagination = () => {
        return <Paginator
            currentPage={props.pageNumber}
            onChangeCurrentPage={onChangeCurrentPage}
            totalUsersCount={props.totalRecords}
            pagesSize={props.pageSize}
        />
    } 

    const rows = 
        props.transactions.map(item => {
            let now = new Date(item.actionDate)
            // let formattedNow = new Date(now.setHours(now.getHours() + 6)).toISOString().slice(0, 10)
            let formattedNow = now.toLocaleDateString()
            return {
                ...item,
                actionDate: formattedNow,
            }
        })
    
    const classes = useStyles()
    
    const onChangeCurrentPage = (pageNumber) => {
        props.getAllTransactions(pageNumber, props.pagesSize, props.filterValues)
    }
    const downloadReport = (filterData, type) => {
        let paramsObj = ''
        if (filterData) {
            for (let item in filterData) {
                filterData[item].forEach(value => {
                    paramsObj += `${item}=${value}&`
                })
            }
        }
        const link = document.createElement('a')
        if(type === 'pdf'){
            link.href = `https://testrepobackend.herokuapp.com/Reports/GetFinanceActionsExcelReport?${paramsObj}`
        } else if(type === 'excel'){
            link.href = `https://testrepobackend.herokuapp.com/Reports/GetFinanceActionsExcelReport?${paramsObj}`
        }
        document.body.appendChild(link)
        link.click()
        link.remove()
    } 

    return <Transactions {...props} 
        classes={classes} 
        CustomPagination={CustomPagination} 
        columns={columns} 
        rows={rows}
        CustomLoadingOverlay={CustomLoadingOverlay}
        downloadReport={downloadReport}
    />
}
 
const mstp = (state) => ({
    transactions: state.transactionsReducer.data,
    transactionsFetching: state.transactionsReducer.transactionsFetching,
    pageSize: state.transactionsReducer.pageSize,
    isModalOpen: state.transactionsReducer.isModalOpen,
    pageNumber: state.transactionsReducer.pageNumber,
    totalRecords: state.transactionsReducer.totalRecords,
    filterValues: state.currentValuesReducer.filterTransactionValues,
})

export default connect(mstp, {
    getAllTransactions,
    getEditedRemittanceData,
    getEditedTransactionData,
    openEditModal,
})(TransactionsContainer) 