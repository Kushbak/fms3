const initialState = {
    currentIncomeFields: {},
    currentExpenseFields: {},
    currentRemittanceFields: {},
    filterTransactionValues: {}
}

const currentValuesReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_INCOME_VALUES':
            return {
                ...state,
                currentIncomeFields: action.incomeValues
            }
        case 'SET_EXPENSE_VALUES':
            return {
                ...state,
                currentExpenseFields: action.expenseValues
            }
        case 'SET_REMITTANCE_VALUES':
            return {
                ...state,
                currentRemittanceFields: action.remittanceValues
            }
        case 'SET_FILTER_TRANSACTION_VALUES':
            return {
                ...state,
                filterTransactionValues: action.filterTransactionValues
            }
        default:
            return state
    }
}

export default currentValuesReducer