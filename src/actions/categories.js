import { categoriesApi } from "../api/api"

export const getIncomeCategories = (categories) => ({
    type: 'SET_INCOME_CATEGORIES',
    categories
}) 
export const addIncomeCategory = (incomeCategory) => ({
    type: 'ADD_INCOME_CATEGORY',
    incomeCategory
})
export const editIncomeCategorySuccess = (incomeCategory) => ({
    type: 'EDIT_INCOME_CATEGORY',
    incomeCategory
})
export const removeIncomeCategory = (incomeCategory) => ({
    type: 'REMOVE_INCOME_CATEGORY',
    incomeCategory
})


export const getExpenseCategories = (categories) => ({
    type: 'SET_EXPENSE_CATEGORIES',
    categories
})
export const addExpenseCategory = (expenseCategory) => ({
    type: 'ADD_EXPENSE_CATEGORY',
    expenseCategory
}) 
export const editExpenseCategorySuccess = (expenseCategory) => ({
    type: 'EDIT_EXPENSE_CATEGORY',
    expenseCategory
})
export const removeExpenseCategory = (expenseCategory) => ({
    type: 'REMOVE_EXPENSE_CATEGORY',
    expenseCategory
})


export const categoriesFetching = (categoriesFetching) => ({
    type: 'CATEGORIES_FETCHING',
    categoriesFetching
})
// ------------ THUNKS ------------

export const getAllCategories = () => (dispatch) => {  
    dispatch(categoriesFetching(true))
    categoriesApi.getCategories()
    .then(res => {  
        dispatch(getIncomeCategories([...res.data.filter(item => +item.operationTypeId === 1)]))
        dispatch(getExpenseCategories([...res.data.filter(item => +item.operationTypeId === 2)])) 
        dispatch(categoriesFetching(false)) 
    })
}

export const createCategory = (formData) => (dispatch) => { 
    categoriesApi.createCategory(formData)
    .then(() => {
        if(formData.type === 1){ 
            dispatch(addIncomeCategory(formData))
        } else { 
            dispatch(addExpenseCategory(formData))
        }
    })
}

export const editCategory = (formData) => (dispatch) => {
    categoriesApi.editCategory(formData).then(res => { 
        if (formData.type === 1) {
            dispatch(addIncomeCategory(formData))
        } else {
            dispatch(addExpenseCategory(formData))
        }
    })
}

export const deleteCategory = (formData) => (dispatch) => { 
    categoriesApi.deleteCategory(formData.id)
    .then(() => { 
        if (formData.type === 1) { 
            dispatch(editIncomeCategorySuccess(formData))
        } else { 
            dispatch(editExpenseCategorySuccess(formData))
        }
    })
}