import { bankAccountsApi } from "../api/api"

export const setBankAccounts = (bankAccounts) => ({
    type: 'SET_BANK_ACCOUNTS',
    bankAccounts
})

export const addBankAccount = (bankAccount) => ({
    type: 'ADD_BANK_ACCOUNT',
    bankAccount
})

export const editBankAccountSuccess = (bankAccount) => ({
    type: 'EDIT_BANK_ACCOUNT',
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
    try {
        dispatch(bankAccountsFetching(true))
        bankAccountsApi.getBankAccountsDetail()
            .then(res => {
                dispatch(setBankAccounts(res.data))
                dispatch(bankAccountsFetching(false))
            })
            .catch(e => {
                getBankAccounts()
            })
    } catch (e) {
        console.log(e)
        getBankAccounts()
    }
}

export const createBankAccount = (formData) => (dispatch) => {
    try {
        bankAccountsApi.createBankAccount(formData).then(res => {
            dispatch(addBankAccount(res.data))
        })
    } catch (e) {
        console.log(e);
    }
}

export const editBankAccount = (formData) => (dispatch) => {
    try {
        // bankAccountsApi.editBankAccount(formData).then(res => {
        dispatch(editBankAccountSuccess(formData))
        // }) 
    } catch (e) {
        console.log(e);
    }
}

export const deleteBankAccount = (formData) => (dispatch) => {
    try {
                debugger
        bankAccountsApi.deleteBankAccount(formData.id).then(res => {
                        debugger
            dispatch(removeBankAccount(res.data))
        })
    } catch (e) {
        console.log(e);
    }
}