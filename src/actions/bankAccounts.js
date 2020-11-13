import { bankAccountsApi } from "../api/api"
import { categoriesFetching } from "./categories"

export const setBankAccounts = (bankAccounts) => ({
    type: 'SET_BANK_ACCOUNTS',
    bankAccounts
})

export const addBankAccount = (bankAccount) => ({
    type: 'ADD_BANK_ACCOUNT',
    bankAccount
})

export const removeBankAccount = (bankAccount) => ({
    type: 'REMOVE_BANK_ACCOUNT',
    bankAccount
}) 

export const bankAccountsFetching = (bankAccountsFetching) => ({
    type: 'BANK_ACCOUNTS_FETCHING',
    bankAccountsFetching
})

export const getBankAccounts = () => (dispatch) => {
    dispatch(bankAccountsFetching(true))
    bankAccountsApi.getScores().then(res => {  
        dispatch(setBankAccounts(res.data))
        dispatch(bankAccountsFetching(false))
    })
}

export const createBankAccount = (formData) => (dispatch) => {
    bankAccountsApi.createScore(formData).then(res => {
        dispatch(addBankAccount(res.data))
    })
}

export const deleteBankAccount = (formData) => (dispatch) => {
    bankAccountsApi.deleteScore(formData).then(res => {
        dispatch(removeBankAccount(res.data))
    })
}