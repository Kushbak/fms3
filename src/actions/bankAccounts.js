import { bankAccountsApi } from "../api/api"
import { DisplayPostMsg } from "./transactions"

export const setBankAccountsIndex = (bankAccountsIndex) => ({
    type: 'SET_BANK_ACCOUNTS_INDEX',
    bankAccountsIndex
})
export const setBankAccountsDetails = (bankAccountDetails) => ({
    type: 'SET_BANK_ACCOUNTS_DETAILS',
    bankAccountDetails
})

export const addBankAccount = (bankAccount) => ({
    type: 'ADD_BANK_ACCOUNT',
    bankAccount
})

export const editBankAccountSuccess = (bankAccountId) => ({
    type: 'EDIT_BANK_ACCOUNT',
    bankAccountId
})

export const removeBankAccount = (bankAccountId) => ({
    type: 'REMOVE_BANK_ACCOUNT',
    bankAccountId
})

export const bankAccountsFetching = (bankAccountsFetching) => ({
    type: 'BANK_ACCOUNTS_FETCHING',
    bankAccountsFetching
})

export const getBankAccounts = () => (dispatch) => {
    try {
        dispatch(bankAccountsFetching(true))
        Promise.all([bankAccountsApi.getBankAccountsDetail(), bankAccountsApi.getBankAccountsIndex()])
            .then(res => {
                dispatch(setBankAccountsDetails(res[0].data))
                dispatch(setBankAccountsIndex(res[1].data))
                dispatch(bankAccountsFetching(false))
            })
            .catch(e => {
                console.log(e)
                dispatch(DisplayPostMsg([e?.response?.message || 'Непредвиденная ошибка при получении счетов. Попробуйте чуть позже', false]))
            })
    } catch (e) {
        console.log(e)
        dispatch(DisplayPostMsg(['Непредвиденная ошибка при получении счетов. Попробуйте чуть позже', false]))
    }
}

export const createBankAccount = (formData) => (dispatch) => {
    try {
        bankAccountsApi.createBankAccount(formData)
            .then(res => { 
                dispatch(DisplayPostMsg([res.data.message, true]))
                dispatch(getBankAccounts())
            })
            .catch(e => {
                console.log(e)
                dispatch(DisplayPostMsg([e?.response?.message || 'Непредвиденная ошибка при создании счета. Попробуйте чуть позже', false]))
            })
    } catch (e) {
        console.log(e)
        dispatch(DisplayPostMsg(['Непредвиденная ошибка при создании счета. Попробуйте чуть позже', false]))
    }
}

export const editBankAccount = (formData) => (dispatch) => {
    try { 
        bankAccountsApi.editBankAccount(formData)
            .then(res => { 
                dispatch(DisplayPostMsg([res.data.message, true]))
                dispatch(editBankAccountSuccess(formData.id))
            }) 
            .catch(e => {
                console.log(e)
                dispatch(DisplayPostMsg([e?.response?.message || 'Непредвиденная ошибка при редактировании. Попробуйте чуть позже', false]))
            })
    } catch (e) {
        console.log(e)
        dispatch(DisplayPostMsg(['Непредвиденная ошибка при редактировании. Попробуйте чуть позже', false]))
    }
}

export const deleteBankAccount = (id) => (dispatch) => {
    try { 
        bankAccountsApi.deleteBankAccount(id)
            .then(res => { 
                dispatch(DisplayPostMsg([res.data.message, true]))
                dispatch(getBankAccounts())
            })
            .catch(e => {
                console.log(e)
                dispatch(DisplayPostMsg([e?.response?.message || 'Непредвиденная ошибка при удалении. Попробуйте чуть позже', false]))
            })
    } catch (e) {
        console.log(e)
        dispatch(DisplayPostMsg(['Непредвиденная ошибка при удалении. Попробуйте чуть позже', false]))
    }
}