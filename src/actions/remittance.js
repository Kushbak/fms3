import { remittanceApi } from "../api/api"
import { getAllTransactions } from "./transactions"

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

export const getRemittance = (pageNumber, pageSize) => (dispatch) => {
    try {
        dispatch(toggleRemittancesFetching(true))
        remittanceApi.getRemittance(pageNumber, pageSize)
            .then(res => {
                dispatch(setRemittance(res.data))
                dispatch(toggleRemittancesFetching(false))
            })
            .catch(e => {
                console.log(e)
                getRemittance()
            })
    } catch (e) {
        console.log(e)
        getRemittance()
    }
}
export const createRemittance = (formData) => (dispatch) => {
    try {
        dispatch(remittanceCreating(true))
        remittanceApi.createRemittance(formData)
            .then(res => {
                dispatch(getAllTransactions())
                dispatch(remittanceCreating(false))
                dispatch(remittanceCreated(true))
                setTimeout(() => dispatch(remittanceCreated(false)), 5000)
            })
    } catch (e) {
        console.log(e);
    }
}

export const editRemittance = (formData) => (dispatch) => {
    debugger
    try {
        remittanceApi.editRemittance(formData)
            .then(res => { 
                debugger
                dispatch(getRemittance())
            })
    } catch (err) {
        console.log(err)
    }
}