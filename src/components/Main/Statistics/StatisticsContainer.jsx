import React from 'react'
import Statistics from './Statistics'
import { connect } from 'react-redux'

const StatisticsContainer = (props) => { 
    let allReducers = {...props.categories, ...props.projects}
    return <Statistics {...props} allReducers={allReducers}/>
}
 
const mstp = (state) => ({
    transactions: state.transactionsReducer.data,
    transactionsFetching: state.transactionsReducer.transactionsFetching,
    categories: state.categoriesReducer,
    contragents: state.contragentsReducer,
    projects: state.projectsReducer,
    bankAccounts: state.bankAccountsReducer,
    projectsStat: state.statisticsReducer.projects,
    operationsStat: state.statisticsReducer.operations,
    statisticsFetching: state.statisticsReducer.statisticsFetching,
})

export default connect(mstp)(StatisticsContainer)