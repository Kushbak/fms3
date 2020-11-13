import React from 'react' 
import { connect } from 'react-redux'
import { addContragent, removeContragent } from '../../../actions/contragents'
import { createCategory, deleteCategory } from '../../../actions/categories'
import { addBankAccount, removeBankAccount } from '../../../actions/bankAccounts' 

import Settings from './Settings'
 
const SettingsContainer = (props) => {
    return <Settings {...props} />
}

const mstp = (state) => ({
    bankAccounts: state.bankAccountsReducer.bankAccounts,
    incomeCategories: state.categoriesReducer.incomeCategories,
    expenseCategories: state.categoriesReducer.expenseCategories,
    categoriesFetching: state.categoriesReducer.categoriesFetching,
    contragents: state.contragentsReducer.contragents
})

export default connect(mstp, 
    {
        createCategory,
        deleteCategory,
        addContragent,
        removeContragent,
        addBankAccount, 
        removeBankAccount 
    }
)(SettingsContainer)