import React from 'react' 
import { connect } from 'react-redux'
import { addContragent, deleteContragent } from '../../../actions/contragents'
import { createCategory, deleteCategory } from '../../../actions/categories'
import { addBankAccount, deleteBankAccount } from '../../../actions/bankAccounts'  
import { editBankAccount } from '../../../actions/bankAccounts'
import { editCategory } from '../../../actions/categories'
import { editContragent } from '../../../actions/contragents'
import { editProject } from '../../../actions/projects' 
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
        deleteContragent,
        addBankAccount, 
        deleteBankAccount,
        editBankAccount,
        editCategory, 
        editContragent,
        editProject
    }
)(SettingsContainer)