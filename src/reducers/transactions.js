const initialState = {
    data: [],
    transactionsFetching: false,
    creatingTransaction: false,
    isPostMsgDisplayed: null,
    totalRecords: 0,
    pageNumber: 1,
    pageSize: 10,
    isModalOpen: false,
    editedTransaction: {}
}

const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_TRANSACTIONS': {
            return {
                ...state,
                ...action.transactions, 
            }
        }
        case 'ADD_TRANSACTION': {
            return {
                ...state,
                data: [ { id: state.transactions.length + 1, ...action.transaction }, ...state.transactions ]
            }
        }
        case 'TRANSACTIONS_FETCHING': {
            return {
                ...state,
                transactionsFetching: action.transactionsFetching,
            }
        }
        case 'CREATING_TRANSACTION': {
            return {
                ...state,
                creatingTransaction: action.creatingTransaction
            }
        } 
        case 'DISPLAY_POST_MSG': {
            return {
                ...state,
                isPostMsgDisplayed: action.postMsg
            }
        }
        case 'SET_CURRENT_PAGE': {
            return { ...state, currentPage: action.currentPage }
        } 
        case 'SET_TOTAL_USERS_COUNT': {
            return { ...state, totalUsersCount: action.totalUsersCount }
        }
        case 'OPEN_EDIT_TRANSACTION_MODAL': {
            return { ...state, isModalOpen: action.isModalOpen }
        }
        case 'SET_EDITED_TRANSACTION': {
            return { ...state, editedTransaction: action.editedTransaction }
        }
        default:
            return state
    }
}

export default transactionsReducer