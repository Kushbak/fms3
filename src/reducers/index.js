import { combineReducers } from 'redux' 
import { reducer as formReducer } from 'redux-form'
import transactionsReducer from './transactions' 
import categoriesReducer from './categories'
import contragentsReducer from './contragents'
import projectsReducer from './projects'
import profileReducer from './profile'
import appReducer from './appReducer'
import statisticsReducer from './statistics'
import remittanceReducer from './remittance'
import bankAccountsReducer from './bankAccounts'
import currentValuesReducer from './currentValues'



export default combineReducers({ 
    form: formReducer,
    transactionsReducer, 
    categoriesReducer,
    projectsReducer,
    contragentsReducer,
    bankAccountsReducer,
    profileReducer,
    remittanceReducer,
    statisticsReducer,
    currentValuesReducer,
    appReducer
})