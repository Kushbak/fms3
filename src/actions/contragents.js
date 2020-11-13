import { contragentsApi } from '../api/api'
import { categoriesFetching } from './categories'

export const setContragents = (contragents) => ({
    type: 'SET_CONTRAGENTS',
    contragents
}) 
export const addContragent = (contragent) => ({
    type: 'ADD_CONTRAGENT',
    contragent
})
export const editContragentSuccess = (contragent) => ({ 
    type: 'EDIT_CONTRAGENT',
    contragent
})  
export const removeContragent = (contragent) => ({
    type: 'REMOVE_CONTRAGENT',
    contragent
})


// ----------- THUNKS ------------

export const getContragents = () => (dispatch) => { 
    dispatch(categoriesFetching(true)) 
    contragentsApi.getContragents()
        .then(res => { 
            dispatch(setContragents(res.data))
            dispatch(categoriesFetching(false))
        })
} 
export const createContragent = (formData) => (dispatch) => {
    contragentsApi.createContragent(formData).then(res => {
        dispatch(addContragent(res.data))
    })
} 
export const editContragent = (formData) => (dispatch) => {
    contragentsApi.editContragent(formData).then(res => {
        dispatch(editContragentSuccess(res.data))
    })
}
export const deleteContragent = (formData) => (dispatch) => {
    contragentsApi.deleteContragent(formData).then(res => {
        dispatch(removeContragent(res.data))
    })
}