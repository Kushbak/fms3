export const setIncomeValues = incomeValues => ({
    type: 'SET_INCOME_VALUES',
    incomeValues
})
export const setExpenseValues = expenseValues => ({
    type: 'SET_EXPENSE_VALUES',
    expenseValues
})
export const setRemittanceValues = remittanceValues => ({
    type: 'SET_REMITTANCE_VALUES',
    remittanceValues
})

export const setFilterTransactionValues = filterTransactionValues => { 
    return {
        type: 'SET_FILTER_TRANSACTION_VALUES',
        filterTransactionValues
    } 
}