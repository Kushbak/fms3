import React, { useState, useEffect } from 'react' 
import { connect } from 'react-redux'
import { createContragent, editContragent, deleteContragent } from '../../../actions/contragents'
import { createCategory, deleteCategory, editCategory } from '../../../actions/categories'
import { getBankAccounts, createBankAccount, deleteBankAccount, editBankAccount } from '../../../actions/bankAccounts'
import { DisplayPostMsg } from '../../../actions/transactions' 
import Settings from './Settings'
import { useMediaQuery } from '@material-ui/core'
import SettingsResponsive from './SettingsResponsive'
import Preloader from '../../common/Preloader/Preloader'
 
const SettingsContainer = (props) => { 
    const [numOfSection, setNum] = useState(0)

    const addNewCategoryHandler = (type) => {
        return (formData) => {
            switch (type) {
                case 'bankAccount': {
                    props.createBankAccount({
                        name: formData.newCategory,
                        code: formData.code,
                        paymentTypeId: formData.paymentTypeId ? 2 : 1
                    })
                    break
                }
                case 'contragent': {
                    props.createContragent({ name: formData.newCategory })
                    break
                }
                case 'income': {
                    props.createCategory({
                        name: formData.newCategory,
                        operationTypes: null,
                        type: 1
                    })
                    break
                }
                case 'expense': {
                    props.createCategory({
                        name: formData.newCategory,
                        operationTypes: null,
                        type: 2
                    })
                    break
                }
                case 'project': {
                    props.createProject({ name: formData.newCategory })
                    break
                }
                default:
                    formData.newCategory = ''
                    setNum(0)
                    break
            }
            formData.newCategory = ''
            setNum(0)
        }
    }
    
    const entities = [
        {
            id: 2,
            title: 'Категория дохода',
            reducerName: 'incomeCategories',
            editFunc: function (value) {
                props.editCategory(value)
            },
            deleteFunc: function (id) {
                props.deleteCategory(id)
            },
            type: 'income'
        },
        {
            id: 3,
            title: 'Категория расхода',
            reducerName: 'expenseCategories',
            editFunc: function (value) {
                props.editCategory(value)
            },
            deleteFunc: function (id) {
                props.deleteCategory(id)
            },
            type: 'expense'
        },
        {
            id: 4,
            title: 'Контрагент',
            reducerName: 'contragents',
            editFunc: function (value) {
                props.editContragent(value)
            },
            deleteFunc: function (id) {
                props.deleteContragent(id)
            },
            type: 'contragent'
        },
    ]
    const mdSize = useMediaQuery('(max-width:768px)')

    useEffect(() => {}, [props.bankAccountDetails, props.incomeCategories, props.expenseCategories, props.contragents])

    if (!props.bankAccountDetails.length 
        && !props.incomeCategories.length 
        && !props.expenseCategories.length 
        && !props.contragents.length
    ) return <Preloader />
    if (mdSize) return <SettingsResponsive {...props} 
        addNewCategory={addNewCategoryHandler} 
        entities={entities} 
        numOfSection={numOfSection} 
        setNum={setNum}
    />
    return <Settings {...props} 
        addNewCategory={addNewCategoryHandler} 
        entities={entities} 
        numOfSection={numOfSection} 
        setNum={setNum}
    />
}

const mstp = (state) => ({
    bankAccountDetails: state.bankAccountsReducer.bankAccountDetails,
    incomeCategories: state.categoriesReducer.incomeCategories,
    expenseCategories: state.categoriesReducer.expenseCategories,
    categoriesFetching: state.categoriesReducer.categoriesFetching, 
    displayedMsg: state.transactionsReducer.displayedMsg,
    contragents: state.contragentsReducer.contragents
})

export default connect(mstp, 
    {
        getBankAccounts,
        createCategory,
        deleteCategory,
        editCategory, 
        deleteContragent,
        createBankAccount,
        deleteBankAccount,
        editBankAccount,
        createContragent,
        editContragent,
        DisplayPostMsg,
    }
)(SettingsContainer)