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
    try {
        dispatch(categoriesFetching(true))
        contragentsApi.getContragents()
            .then(res => {
                dispatch(setContragents(res.data))
                dispatch(categoriesFetching(false))
            })
            .catch(e => {
                console.log(e)
                getContragents()
            })
    } catch (e) {
        console.log(e)
        getContragents()
    }
}
export const createContragent = (formData) => (dispatch) => {
    try {
        contragentsApi.createContragent(formData).then(res => {
            dispatch(addContragent(res.data))
        })
    } catch (e) {
        console.log(e);
    }
}
export const editContragent = (formData) => (dispatch) => {
    try {
        contragentsApi.editContragent(formData).then(res => {
            dispatch(editContragentSuccess(res.data))
        })
    } catch (e) {
        console.log(e);
    }
}
export const deleteContragent = (formData) => (dispatch) => {
    try {
        debugger
        contragentsApi.deleteContragent(formData.id).then(res => {
            debugger
            dispatch(removeContragent(res.data))
        })
    } catch (e) {
        console.log(e);
    }
}