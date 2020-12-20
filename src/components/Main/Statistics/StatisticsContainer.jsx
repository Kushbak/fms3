import React from 'react'
import Statistics from './Statistics'
import { connect } from 'react-redux'
import { getStatistics } from '../../../actions/statistics'

const StatisticsContainer = (props) => {  
    const submit = (formData) => {
        const now = new Date()
        const nextMonth = new Date().setMonth(now.getMonth() + 1)
        const endOfMonth = new Date(nextMonth).setDate(now.getDate() - now.getDate())
        const data = {
            ...formData,
            StartDate: formData.StartDate ? formData.StartDate : new Date().setDate(1),
            EndDate: formData.EndDate ? formData.EndDate : new Date(endOfMonth),
        }
        props.getStatistics(data)
    }
    return <Statistics {...props} submit={submit}/>
}
 
const mstp = (state) => ({
    contragents: state.contragentsReducer.contragents,
    projects: state.projectsReducer.projects,
    incomeCategories: state.categoriesReducer.incomeCategories,
    expenseCategories: state.categoriesReducer.expenseCategories,
    statisticsData: state.statisticsReducer.statisticsData,
    statisticsFetching: state.statisticsReducer.statisticsFetching,
    finactions: state.transactionsReducer.data
})

export default connect(mstp, { getStatistics })(StatisticsContainer)