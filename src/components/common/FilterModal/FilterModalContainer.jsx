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
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles(() => ({
    input: {
        '& .MuiFormLabel-root.Mui-focused': {
            color: '#32b482'
        },
        '& .MuiInput-underline:after': {
            borderBottom: '2px solid #32b482'
        }
    },
    greenSelectedOption: {
        '.MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover': {
            backgroundColor: 'rgba(50, 180, 130, 0.3)'
        }
    },
}))

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

    const classes = useStyles()

    useEffect(() => {
        setFilterFormValues(props.formValues)
    }, [props.formValues])

    return <FilterModalComponent {...props} 
        setFilterFormValues={setFilterFormValues} 
        onSubmit={submit} 
        classes={classes}
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