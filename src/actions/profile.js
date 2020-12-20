import { profileApi } from "../api/api"
import { startSubmit, stopSubmit } from "redux-form"
import { DisplayPostMsg } from "./transactions"
import { updateToken } from "./authorization"

export const editUserDataSuccess = (userData) => ({
    type: 'EDIT_USER_DATA',
    userData
})

export const editPasswordSuccess = (password) => ({
    type: 'EDIT_PASSWORD',
    password
})

export const editUserData = (userData) => (dispatch) => {
    dispatch(startSubmit('editProfile'))
    profileApi.editProfile(userData)
        .then(res => {
            // updateToken(res.data.token)
            dispatch(DisplayPostMsg(res.data.message))
            dispatch(stopSubmit('editProfile'))
        })
        .catch(e => {
            dispatch(stopSubmit('editProfile'))
        })
}

export const editPassword = (passwords) => (dispatch) => {
    dispatch(startSubmit('editPassword'))
    profileApi.changePassword(passwords)
        .then(res => {
            dispatch(DisplayPostMsg(res.data.message))
            dispatch(stopSubmit('editPassword'))
        })
        .catch(e => {
            dispatch(stopSubmit('editPassword'))
        })
}