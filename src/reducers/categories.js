const initialState = {
    expenseCategories: [],
    incomeCategories: [],  
    categoriesFetching: false
}

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CATEGORIES_FETCHING':
            return {
                ...state,
                categoriesFetching: action.categoriesFetching
            } 
        case 'SET_INCOME_CATEGORIES':
            return {
                ...state,
                incomeCategories: [...action.categories]
            }
        case 'SET_EXPENSE_CATEGORIES':
            return {
                ...state,
                expenseCategories: [...action.categories]
            }
        case 'ADD_INCOME_CATEGORY':
            return {
                ...state,
                incomeCategories: [...state.incomeCategories, action.incomeCategory]
            }
        case 'REMOVE_INCOME_CATEGORY':
            return {
                ...state,
                incomeCategories: state.incomeCategories.filter(item => item.name !== action.incomeCategory)
            }
        case 'ADD_EXPENSE_CATEGORY':
            return {
                ...state,
                expenseCategories: [...state.expenseCategories, action.expenseCategory]
            }
        case 'REMOVE_EXPENSE_CATEGORY':
            return {
                ...state,
                expenseCategories: state.expenseCategories.filter(item => item.name !== action.expenseCategory)
            } 
        default:
            return state
    }
}

export default categoriesReducer