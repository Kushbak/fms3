const initialState = { 
    bankAccountsIndex: [], 
    bankAccountDetails: [],
    accountsFetching: true
}

const bankAccountsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_BANK_ACCOUNTS_INDEX':
            return {
                ...state,
                bankAccountsIndex: [...action.bankAccountsIndex]
            }
        case 'SET_BANK_ACCOUNTS_DETAILS':
            return {
                ...state,
                bankAccountDetails: [...action.bankAccountDetails]
            }
        case 'ADD_BANK_ACCOUNT':
            return {
                ...state,
                bankAccountsIndex: [...state.bankAccountsIndex, action.bankAccount]
            }
        case 'EDIT_BANK_ACCOUNT': 
            return {
                ...state,
                bankAccountsIndex: state.bankAccountsIndex.map(item => item.id === action.bankAccountId ? action.bankAccountId : item)
            }
        case 'REMOVE_BANK_ACCOUNT':
            return {
                ...state,
                bankAccountsIndex: state.bankAccountsIndex.filter(item => item.id !== action.bankAccountId)
            }
        case 'BANK_ACCOUNTS_FETCHING':
            return { 
                ...state,
                accountsFetching: action.bankAccountsFetching
            }
        default:
            return state
    }
}

export default bankAccountsReducer