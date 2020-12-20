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
    try {
        dispatch(startSubmit('editProfile'))
        profileApi.editProfile(userData)
            .then(res => {
                // dispatch(updateToken(res.data.token))
                dispatch(DisplayPostMsg([res.data.message, true]))
                dispatch(stopSubmit('editProfile'))
            })
            .catch(e => {
                dispatch(stopSubmit('editProfile'))
                dispatch(DisplayPostMsg(['Непредвиденная ошибка. Попробуйте чуть позже', false]))
            })
    } catch(e) {
        dispatch(DisplayPostMsg(['Непредвиденная ошибка. Попробуйте чуть позже', false]))

    }
}

export const editPassword = (passwords) => (dispatch) => {
    try {
        dispatch(startSubmit('editPassword'))
        profileApi.changePassword(passwords)
            .then(res => {
                dispatch(DisplayPostMsg([res.data.message, true]))
                dispatch(stopSubmit('editPassword'))
            })
            .catch(e => {
                dispatch(stopSubmit('editPassword'))
                dispatch(DisplayPostMsg(['Непредвиденная ошибка. Попробуйте чуть позже', false]))
            })
    } catch(e) {
        dispatch(DisplayPostMsg(['Непредвиденная ошибка. Попробуйте чуть позже', false]))

    }
}