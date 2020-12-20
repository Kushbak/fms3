import { transactionsApi } from "../api/api"
import { getStatistics } from './statistics'
import { startSubmit, stopSubmit } from "redux-form"

export const transactionsFetching = (transactionsFetching) => ({
    type: 'TRANSACTIONS_FETCHING',
    transactionsFetching
})

export const creatingTransaction = (creatingTransaction) => ({
    type: 'CREATING_TRANSACTION',
    creatingTransaction
})

export const getAllTransactionsSuccess = (transactions) => ({
    type: 'GET_ALL_TRANSACTIONS',
    transactions
})


export const DisplayPostMsg = (postMsg) => ({
    type: 'DISPLAY_POST_MSG',
    postMsg
})

export const setCurrentPage = (currentPage) => ({
    type: 'SET_CURRENT_PAGE',
    currentPage
})

export const setTotalUsersCount = (totalUsersCount) => ({
    type: 'SET_TOTAL_USERS_COUNT',
    totalUsersCount
})

export const openEditModal = (isModalOpen) => ({
    type: 'OPEN_EDIT_TRANSACTION_MODAL',
    isModalOpen
})

export const setEditedTransaction = (editedTransaction) => ({
    type: 'SET_EDITED_TRANSACTION',
    editedTransaction
})


export const getAllTransactions = (pageNumber, pageSize, filterData) => (dispatch) => {
    try {
        dispatch(transactionsFetching(true))
        transactionsApi.getTransactions(pageNumber, pageSize, filterData)
            .then(res => {
                dispatch(getAllTransactionsSuccess(res.data))
                // dispatch(getStatistics())
                dispatch(transactionsFetching(false))
            })
            .catch(e => {
                console.log(e)
            })
    } catch (e) {
        console.log(e)
    }
}

export const getEditedTransactionData = (id) => (dispatch) => {
    try {
        transactionsApi.getEditedTransactionData(id)
            .then(res => {
                dispatch(setEditedTransaction(res.data))
            })
    } catch (err) {
        console.log(err)
    }
}

export const editTransaction = (formData) => (dispatch) => {
    try {
        dispatch(startSubmit('editTransaction'))
        transactionsApi.editTransaction(formData)
            .then(res => {
                dispatch(getAllTransactions())
                dispatch(DisplayPostMsg(res.data.message))
            })
            .catch(err => {
                dispatch(stopSubmit('editTransaction'))
            })
    } catch (e) {
        console.log(e)
        dispatch(stopSubmit('editTransaction'))
    }
}

export const createTransaction = (formData) => (dispatch) => {
    try {
        dispatch(startSubmit('income'))
        dispatch(startSubmit('expense'))
        dispatch(startSubmit('remittance'))
        transactionsApi.createTransaction(formData)
            .then(res => {
                dispatch(DisplayPostMsg(res.data.message))
                dispatch(stopSubmit('income'))
                dispatch(stopSubmit('expense'))
                dispatch(stopSubmit('remittance'))
                dispatch(getAllTransactions())
            })
            .catch(e => {
                dispatch(stopSubmit('income'))
                dispatch(stopSubmit('expense'))
                dispatch(stopSubmit('remittance'))
            })
    } catch (e) {
        console.log(e)
        dispatch(stopSubmit('income'))
                dispatch(stopSubmit('expense'))
                dispatch(stopSubmit('remittance'))
    }
} 