import { remittanceApi } from "../api/api"
import { getAllTransactions, setEditedTransaction, DisplayPostMsg } from "./transactions"
import { startSubmit, stopSubmit } from "redux-form"

export const setRemittance = (remittances) => ({
    type: 'SET_REMITTANCES',
    remittances
})
export const postRemittanceSuccess = (remittanceData) => ({
    type: 'POST_REMITTANCE',
    remittanceData
})
export const toggleRemittancesFetching = (isRemittancesFetching) => ({
    type: 'SET_REMITTANCE_FETCHING',
    isRemittancesFetching
})
export const remittanceCreating = (remittanceCreating) => ({
    type: 'REMITTANCE_CREATING',
    remittanceCreating
})
export const remittanceCreated = (remittanceCreated) => ({
    type: 'REMITTANCE_CREATED',
    remittanceCreated
})

export const createRemittance = (formData) => (dispatch) => {
    try {
        dispatch(startSubmit('remittance'))
        remittanceApi.createRemittance(formData)
            .then(res => {
                dispatch(getAllTransactions())
                dispatch(remittanceCreated(true))
                dispatch(stopSubmit('remittance'))
                dispatch(DisplayPostMsg(res.data.message))
            })
    } catch (e) {
        console.log(e)
        dispatch(stopSubmit('remittance'))
    }
}

export const getEditedRemittanceData = (id) => (dispatch) => {
    try {
        remittanceApi.getEditedRemittanceData(id)
            .then(res => {
                dispatch(setEditedTransaction(res.data))
            })
    } catch (err) {
        console.log(err)
    }
}

export const editRemittance = (formData) => (dispatch) => {
    try {
        dispatch(startSubmit('editTransaction'))
        remittanceApi.editRemittance(formData)
            .then(res => {
                dispatch(getAllTransactions())
                dispatch(stopSubmit('editTransaction'))
                dispatch(DisplayPostMsg(res.data.message))
            })
            .catch(err => {
                dispatch(stopSubmit('editTransaction'))
                dispatch(DisplayPostMsg(err))
            })
    } catch (err) {
        console.log(err)
        dispatch(stopSubmit('editTransaction'))
    }
}