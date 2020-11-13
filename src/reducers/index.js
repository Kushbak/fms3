import { combineReducers } from 'redux' 
import { reducer as formReducer } from 'redux-form'
import transactionsReducer from './transactions' 
import categoriesReducer from './categories'
import contragentsReducer from './contragents'
import projectsReducer from './projects'
import profileReducer from './profile'
import appReducer from './appReducer'
import bankAccountsReducer from './bankAccounts'



export default combineReducers({ 
    form: formReducer,
    transactionsReducer, 
    categoriesReducer,
    projectsReducer,
    contragentsReducer,
    bankAccountsReducer,
    profileReducer,
    appReducer
})