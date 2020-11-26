const initialState = { 
    bankAccounts: [ ], 
    accountsFetching: true
}

const bankAccountsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_BANK_ACCOUNTS':
            return {
                ...state,
                bankAccounts: [...action.bankAccounts]
            }
        case 'ADD_BANK_ACCOUNT':
            return {
                ...state,
                bankAccounts: [...state.bankAccounts, action.bankAccount]
            }
        case 'EDIT_BANK_ACCOUNT': 
            return {
                ...state,
                bankAccounts: state.bankAccounts.map(item => item.id === action.bankAccount.id ? action.bankAccount : item)
            }
        case 'REMOVE_BANK_ACCOUNT':
            return {
                ...state,
                bankAccounts: state.bankAccounts.filter(item => item.name !== action.bankAccount)
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