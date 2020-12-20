import { categoriesApi } from "../api/api"
import { DisplayPostMsg } from "./transactions"

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
export const removeIncomeCategorySuccess = (incomeCategoryId) => ({
    type: 'REMOVE_INCOME_CATEGORY',
    incomeCategoryId
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
export const removeExpenseCategorySuccess = (expenseCategoryId) => ({
    type: 'REMOVE_EXPENSE_CATEGORY',
    expenseCategoryId
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
                dispatch(DisplayPostMsg(['Непредвиденная ошибка при получении категорий. Попробуйте чуть позже', false]))
            })
    } catch (e) {
        console.log(e)
        dispatch(DisplayPostMsg(['Непредвиденная ошибка при получении категорий. Попробуйте чуть позже', false]))
    }
}

export const createCategory = (formData) => (dispatch) => {
    try {
        categoriesApi.createCategory(formData)
            .then(res => {
                if (formData.type === 1) {
                    dispatch(addIncomeCategorySuccess(formData))
                } else {
                    dispatch(addExpenseCategorySuccess(formData))
                }
                dispatch(DisplayPostMsg([res.data.message, true]))
            })
            .catch(e => {
                console.log(e)
                dispatch(DisplayPostMsg(['Непредвиденная ошибка при создании категорий. Попробуйте чуть позже', false]))
            })
    } catch (e) {
        console.log(e)
        dispatch(DisplayPostMsg(['Непредвиденная ошибка при создании категорий. Попробуйте чуть позже', false]))
    }
}

export const editCategory = (formData) => (dispatch) => {
    try {
        categoriesApi.editCategory(formData)
            .then(res => {
                if (formData.operationTypeId === 1) {
                    dispatch(editIncomeCategorySuccess(formData))
                } else {
                    dispatch(editExpenseCategorySuccess(formData))
                }
                dispatch(DisplayPostMsg([res.data.message, true]))
            })
            .catch(e => {
                console.log(e)
                dispatch(DisplayPostMsg(['Непредвиденная ошибка при редактировании категорий. Попробуйте чуть позже', false]))
            })
    } catch (e) {
        console.log(e)
        dispatch(DisplayPostMsg(['Непредвиденная ошибка при редактировании категорий. Попробуйте чуть позже', false]))
    }
}

export const deleteCategory = (id) => (dispatch) => {
    try {
        categoriesApi.deleteCategory(id)
            .then(res => {
                dispatch(removeIncomeCategorySuccess(id))
                dispatch(removeExpenseCategorySuccess(id))
                dispatch(DisplayPostMsg([res.data.message, true]))
            })
            .catch(e => {
                console.log(e)
                dispatch(DisplayPostMsg(['Непредвиденная ошибка при удалении категорий. Попробуйте чуть позже', false]))
            })
    } catch (e) {
        console.log(e)
        dispatch(DisplayPostMsg(['Непредвиденная ошибка при удалении категорий. Попробуйте чуть позже', false]))
    }
}