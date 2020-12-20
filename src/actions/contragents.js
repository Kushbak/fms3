import { contragentsApi } from '../api/api'
import { categoriesFetching } from './categories'
import { DisplayPostMsg } from './transactions'

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
export const removeContragent = (contragentId) => ({
    type: 'REMOVE_CONTRAGENT',
    contragentId
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
    }
}
export const createContragent = (formData) => (dispatch) => {
    try {
        contragentsApi.createContragent(formData)
            .then(res => {
                dispatch(getContragents())
                dispatch(DisplayPostMsg(res.data.message))
            })
            .catch(e => {
                console.log(e)
                dispatch(DisplayPostMsg('Непредвиденная ошибка. Попробуйте чуть позже'))
            })
    } catch (e) {
        console.log(e)
    }
}
export const editContragent = (formData) => (dispatch) => {
    try {
        contragentsApi.editContragent(formData)
            .then(res => {
                dispatch(editContragentSuccess(res.data))
                dispatch(DisplayPostMsg('Контрагент успешно создан.'))
            })
            .catch(e => {
                console.log(e)
                dispatch(DisplayPostMsg('Непредвиденная ошибка. Попробуйте чуть позже'))
            })
    } catch (e) {
        console.log(e)
    }
}
export const deleteContragent = (id) => (dispatch) => {
    try {
        contragentsApi.deleteContragent(id)
            .then(res => {
                dispatch(removeContragent(id))
                dispatch(DisplayPostMsg('Контрагент удален.'))
            })
            .catch(e => {
                console.log(e)
                dispatch(DisplayPostMsg('Непредвиденная ошибка. Попробуйте чуть позже'))
            })
    } catch (e) {
        console.log(e)
    }
}