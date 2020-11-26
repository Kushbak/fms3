import { categoriesApi } from "../api/api"

export const getIncomeCategories = (categories) => ({
    type: 'SET_INCOME_CATEGORIES',
    categories
}) 
export const addIncomeCategorySuccess = (incomeCategory) => ({
    type: 'ADD_INCOME_CATEGORY',
    incomeCategory
})
export const editIncomeCategorySuccess = (incomeCategory) => ({
    type: 'EDIT_INCOME_CATEGORY',
    incomeCategory
})
export const removeIncomeCategorySuccess = (incomeCategory) => ({
    type: 'REMOVE_INCOME_CATEGORY',
    incomeCategory
})


export const getExpenseCategories = (categories) => ({
    type: 'SET_EXPENSE_CATEGORIES',
    categories
})
export const addExpenseCategorySuccess = (expenseCategory) => ({
    type: 'ADD_EXPENSE_CATEGORY',
    expenseCategory
}) 
export const editExpenseCategorySuccess = (expenseCategory) => ({
    type: 'EDIT_EXPENSE_CATEGORY',
    expenseCategory
})
export const removeExpenseCategorySuccess = (expenseCategory) => ({
    type: 'REMOVE_EXPENSE_CATEGORY',
    expenseCategory
})


export const categoriesFetching = (categoriesFetching) => ({
    type: 'CATEGORIES_FETCHING',
    categoriesFetching
})
// ------------ THUNKS ------------

export const getAllCategories = () => (dispatch) => {
    try {
        dispatch(categoriesFetching(true))
        categoriesApi.getCategories()
            .then(res => {
                dispatch(getIncomeCategories([...res.data.filter(item => +item.operationTypeId === 1)]))
                dispatch(getExpenseCategories([...res.data.filter(item => +item.operationTypeId === 2)]))
                dispatch(categoriesFetching(false))
            })
            .catch(e => { 
                console.log(e)
                getAllCategories()
            })
    } catch (e) {
        console.log(e)
        getAllCategories()
    }
}

export const createCategory = (formData) => (dispatch) => {
    try {
    categoriesApi.createCategory(formData)
    .then(() => {
        if(formData.type === 1){ 
            dispatch(addIncomeCategorySuccess(formData))
        } else { 
            dispatch(addExpenseCategorySuccess(formData))
        }
    })
    } catch (e) {
        console.log(e);
    }
}

export const editCategory = (formData) => (dispatch) => { 
    try{
        categoriesApi.editCategory(formData).then(res => { 
            if (formData.operationTypeId === 1) { 
                dispatch(editIncomeCategorySuccess(formData))
            } else { 
                dispatch(editExpenseCategorySuccess(formData))
            }
        })
    } catch(e) {
        console.log(e);
    }
}

export const deleteCategory = (formData) => (dispatch) => {  
    try{ 
            debugger

        categoriesApi.deleteCategory(formData.id)
        .then(() => {  
            if (formData.type === 1) {  
            debugger

                dispatch(removeIncomeCategorySuccess(formData))
            } else {  
            debugger

                dispatch(removeExpenseCategorySuccess(formData))
            }
        })
    } catch(e) {
        console.log(e);
    }
}