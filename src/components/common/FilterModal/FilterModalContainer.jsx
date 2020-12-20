import React, { useRef } from 'react' 
import { setFilterTransactionValues } from '../../../actions/currentValues'
import { getAllTransactions } from '../../../actions/transactions'
import { getContragents } from '../../../actions/contragents'
import { getAllCategories } from '../../../actions/categories'
import { getFormValues } from 'redux-form'
import { getBankAccounts } from '../../../actions/bankAccounts'
import { getProjects } from '../../../actions/projects'   
import FilterModalComponent from './FilterModal'
import { connect } from 'react-redux'
import { useEffect } from 'react'

const FilterModal = (props) => {

    const setFilterFormValues = () => {
        if (!!props.formValues) {
            props.setFilterTransactionValues(props.formValues)
        }
    }

    const submit = (formData) => {
        const now = new Date()
        const nextMonth = new Date().setMonth(now.getMonth() + 1)
        const endOfMonth = new Date(nextMonth).setDate(now.getDate() - now.getDate())
        const data = {
            ...formData,
            StartDate: formData.StartDate ? formData.StartDate : new Date().setDate(1),
            EndDate: formData.EndDate ? formData.EndDate : new Date(endOfMonth),
        }
        props.getAllTransactions(1, props.pageSize, data)
    }

    useEffect(() => {
        setFilterFormValues(props.formValues)
    }, [props.formValues])

    return <FilterModalComponent {...props} 
        setFilterFormValues={setFilterFormValues} 
        onSubmit={submit} 
    />
}

const mstp = state => ({
    incomes: state.categoriesReducer.incomeCategories,
    expenses: state.categoriesReducer.expenseCategories,
    contragents: state.contragentsReducer.contragents,
    projects: state.projectsReducer.projects,
    bankAccountsIndex: state.bankAccountsReducer.bankAccountsIndex,
    formValues: getFormValues('filter')(state),
    initialValues: state.currentValuesReducer.filterTransactionValues,
})

export default connect(mstp, {
    setFilterTransactionValues,
    getAllTransactions,
    getContragents,
    getAllCategories,
    getBankAccounts,
    getProjects,
})(FilterModal)