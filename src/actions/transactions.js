import { transactionsApi } from "../api/api"
import { getStatistics } from './statistics'

export const transactionsFetching = (transactionsFetching) => ({
    type: 'TRANSACTIONS_FETCHING',
    transactionsFetching
})

export const creatingTransaction = (creatingTransaction) => ({
    type: 'CREATING_TRANSACTION',
    creatingTransaction
})

export const addTransaction = (transaction) => ({
    type: 'ADD_TRANSACTION',
    transaction
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


export const getAllTransactions = (page) => (dispatch) => {
    try {
        dispatch(transactionsFetching(true))
        transactionsApi.getTransactions(page)
            .then(res => {
                dispatch(getAllTransactionsSuccess(res.data))
                dispatch(getStatistics())
                dispatch(transactionsFetching(false))
            })
            .catch(e => {
                console.log(e)
                getAllTransactions()
            })
    } catch (e) {
        console.log(e)
    }
}

export const editTransaction = (formData) => (dispatch) => { 
    try {
        debugger
        transactionsApi.editTransaction(formData)
            .then(res => {  
                debugger
                dispatch(getAllTransactions())
            }) 
    } catch (e) {
        console.log(e) 
    }
}

export const createTransaction = (formData) => (dispatch) => {
    try { 
        debugger
        dispatch(creatingTransaction(true))
        transactionsApi.createTransaction(formData)
            .then(res => {  
                dispatch(DisplayPostMsg(res.data.message))
                dispatch(creatingTransaction(false))
                dispatch(getAllTransactions())
                setTimeout(() => {
                    dispatch(DisplayPostMsg(null))
                }, 8000);
            })
    } catch (e) {
        console.log(e);
    }
}

export const requestTransactions = (currentPage, pagesSize) => (dispatch) => {
    try {
        dispatch(transactionsFetching(true));
        transactionsApi.getTransactions(currentPage, pagesSize)
            .then(res => {
                dispatch(setCurrentPage(currentPage));
                dispatch(setTotalUsersCount(res.totalCount));
                dispatch(getAllTransactions(res.items));
                dispatch(transactionsFetching(false));
            });
    } catch (e) {
        console.log(e);
    }
};