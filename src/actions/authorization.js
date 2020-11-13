import { stopSubmit } from "redux-form"
import { authApi } from "../api/api"
import decode from 'jwt-decode'

export const setAuthUserData = (userData, isAuth) => ({
    type: 'SET_AUTH_USER_DATA',
    userData,
    isAuth
})

export const usernamePass = (id, username, password) => ({
    type: 'USERNAME_PASS',
    payload: { id, username, password }
})

export const toggleIsFetching = (isFetching) => ({
    type: 'SET_IS_FETCHING',
    isFetching
})

export const initializedSuccess = () => ({ type: 'INITIALIZED_SUCCESS' });


export const initializeApp = () => (dispatch) => {
    toggleIsFetching(true)
    try {
        if (loggedIn()) {
            authApi.setToken(getToken())
            dispatch(setAuthUserData(getProfile(), true))
            dispatch(initializedSuccess())
            toggleIsFetching(false)
        }
    } catch (e) {
        console.log('Произошла ошибка ' + e);
    }
}
// REDUX-THUNKS  


const setToken = (idToken) => {
    // Saves user token to localStorage 
    localStorage.setItem('id_token', idToken);
}

const getToken = () => {
    // Retrieves the user token from localStorage 
    return localStorage.getItem('id_token');
}

const isTokenExpired = (token) => {
    try {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) {
            // Checking if token is expired. N
            return true;
        } else return false;
    } catch (err) {
        return false;
    }
}

export const loggedIn = () => {
    // Checks if there is a saved token and it's still valid 
    const token = getToken(); // GEtting token from localstorage
    return !!token && !isTokenExpired(token); // handwaiving here
}

const getProfile = () => {
    // Using jwt-decode npm package to decode the token 
    console.log(decode(getToken()));
    return decode(getToken());
}

export const login = (formData) => (dispatch) => {
    try {
        dispatch(toggleIsFetching(true))
        authApi.login(formData.fullName, formData.password)
            .then(response => { 
                setToken(response.data.token)
                authApi.setToken(response.data.token)
                dispatch(setAuthUserData(getProfile(), true))
                dispatch(initializedSuccess())
                dispatch(toggleIsFetching(false)) 
            }).catch(e => {
                dispatch(stopSubmit('login', { _error: 'Неправильный логин или пароль' }))
                dispatch(toggleIsFetching(false)) 
                console.log('Произошла ошибка ' + e)
            })
    } catch (e) {
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
        dispatch(toggleIsFetching(true))
        authApi.register(formData)
            .then(r => {
                if (r.status === 200) {
                    dispatch(setAuthUserData(r.data, true))
                    dispatch(initializedSuccess())
                    dispatch(toggleIsFetching(false))
                } else {
                    alert('Что-то пошло не так')
                    dispatch(toggleIsFetching(false))
                }
            })
    } catch (e) {
        console.log('Произошла ошибка ' + e)
    }
}
