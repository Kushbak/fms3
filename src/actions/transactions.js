import { transactionsApi } from "../api/api"

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
    type: 'SET-CURRENT-PAGE', 
    currentPage 
});

export const setTotalUsersCount = (totalUsersCount) => ({ 
    type: 'SET-TOTAL-USERS-COUNT', 
    totalUsersCount 
});


export const getAllTransactions = () => (dispatch) => {
    dispatch(transactionsFetching(true))
    transactionsApi.getTransactions().then(res => { 
        dispatch(getAllTransactionsSuccess(res.data))
        dispatch(transactionsFetching(false))
    })
}

export const createTransaction = (formData) => (dispatch) => { 
    dispatch(creatingTransaction(true))
    transactionsApi.createTransactions(formData)
        .then(res => {  
            dispatch(DisplayPostMsg(true))  
            dispatch(creatingTransaction(false))
            dispatch(getAllTransactions()) 
            setTimeout(() => { 
                dispatch(DisplayPostMsg(false)) 
            }, 8000);
        })
}

export const requestTransactions = (currentPage, pagesSize) => (dispatch) => {
    dispatch(transactionsFetching(true));
    transactionsApi.getTransactions(currentPage, pagesSize)
        .then(res => {
            dispatch(setCurrentPage(currentPage));
            dispatch(setTotalUsersCount(res.totalCount));
            dispatch(getAllTransactions(res.items));
            dispatch(transactionsFetching(false));
        });
};