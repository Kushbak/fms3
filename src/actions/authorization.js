import { stopSubmit, startSubmit } from "redux-form"
import { authApi, profileApi } from "../api/api"
import decode from 'jwt-decode'

export const setAuthUserData = (userData, isAuth) => ({
    type: 'SET_AUTH_USER_DATA',
    userData,
    isAuth
})

export const setProfile = (profile) => ({
    type: 'SET_PROFILE',
    profile
})

export const toggleIsFetching = (isFetching) => ({
    type: 'SET_IS_FETCHING',
    isFetching
})

export const initializedSuccess = () => ({ type: 'INITIALIZED_SUCCESS' });

export const getProfileData = () => dispatch => {
    profileApi.getProfile().then(res => {
        dispatch(setProfile(res.data))
    })
}

export const initializeApp = () => (dispatch) => {
    dispatch(toggleIsFetching(true))
    try {
        if (loggedIn()) {
            authApi.setToken(getToken())
            dispatch(setAuthUserData(decodeTokenData(), true))
            dispatch(initializedSuccess())
            dispatch(getProfileData())
            dispatch(toggleIsFetching(false))
        }
    } catch (e) {
        console.log('Произошла ошибка ' + e)
        dispatch(toggleIsFetching(false))
    }
}
// REDUX-THUNKS  


const setToken = (idToken) => {
    // Saves user token to localStorage 
    localStorage.setItem('id_token', idToken)
}

const getToken = () => {
    // Retrieves the user token from localStorage 
    return localStorage.getItem('id_token')
}

const isTokenExpired = (token) => {
    try {
        const decoded = decode(token)
        if (decoded.exp < Date.now() / 1000) {
            // Checking if token is expired. N
            return true
        } else return false
    } catch (err) {
        return false
    }
}

export const loggedIn = () => {
    // Checks if there is a saved token and it's still valid 
    const token = getToken(); // GEtting token from localstorage
    return !!token && !isTokenExpired(token); // handwaiving here
}

const decodeTokenData = () => {
    // Using jwt-decode npm package to decode the token 
    console.log(decode(getToken()));
    return decode(getToken());
}

export const updateToken = (token) => (dispatch) => {
    setToken(token)
    authApi.setToken(token)
    dispatch(getProfileData())
    dispatch(setAuthUserData(decodeTokenData(), true))
}

export const login = (formData) => (dispatch) => {
    try {
        dispatch(startSubmit('login'))
        authApi.login(formData.username, formData.password)
            .then(response => {
                updateToken(response.data.token)
                dispatch(initializedSuccess())
                dispatch(stopSubmit('login'))
            }).catch(e => {
                dispatch(stopSubmit('login', { _error: 'Неправильный логин или пароль' }))
                console.log('Произошла ошибка ' + e)
            })
    } catch (e) {
        dispatch(stopSubmit('login', { _error: 'Непредвиденная ошибка. Попробуйте позже.' }))
        console.log('Произошла ошибка ' + e)
    }
}

export const logout = () => (dispatch) => {
    try {
        dispatch(setAuthUserData(undefined, false))
        localStorage.removeItem('id_token');
    } catch (e) {
        console.log('Произошла ошибка ' + e)
    }
}

export const register = (formData) => (dispatch) => {

    try {
        dispatch(startSubmit('register'))
        authApi.register(formData)
            .then(r => {
                if (r.status === 200) {
                    dispatch(stopSubmit('register'))
                    dispatch(login(formData))
                } else {
                    dispatch(stopSubmit('register', { _error: 'Непредвиденная ошибка. Попробуйте позже.' }))
                }
            })
    } catch (e) {
        dispatch(stopSubmit('register'))
        console.log('Произошла ошибка ' + e)
    }
} 