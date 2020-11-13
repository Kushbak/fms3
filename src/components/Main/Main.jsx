import React, { useEffect } from 'react' 
import { Redirect } from 'react-router-dom'
import styles from './Main.module.css'
import { Route, Switch } from 'react-router-dom'
import BankAccounts from './BankAccounts/BankAccounts' 
import Sidebar from '../Sidebar/Sidebar'
import MainContent from './MainContent/MainContent' 
import Transfer from './Transfer/Transfer' 
import BankAccountPage from './BankAccounts/BankAccountPage/BankAccountPage'
import { connect, useDispatch } from 'react-redux' 
import SettingsContainer from './Settings/SettingsContainer'
import Profile from './Profile/Profile' 
import { getAllTransactions } from '../../actions/transactions'
import { getAllCategories } from '../../actions/categories'
import { getBankAccounts } from '../../actions/bankAccounts'
import { getProjects } from '../../actions/projects'
import { getContragents } from '../../actions/contragents'
import Transactions from './TransactionsPage/Transactions'
import StatisticsContainer from './Statistics/StatisticsContainer'

const Main = (props) => {
    const dispatch = useDispatch()
    useEffect(() => { 
        dispatch(getAllTransactions())
        dispatch(getProjects())
        dispatch(getBankAccounts())
        setTimeout(() => {
            dispatch(getAllCategories())
        }, 200);
        setTimeout(() => {
            dispatch(getContragents())
        }, 300);
    }, [])
    if (!props.isAuth) {
        return <Redirect to='/authorization' />
    }  
    return (
        <section className={ styles.mainPage }> 
            <Sidebar /> 
            <div className={ styles.mainContent }>
                {/* <button onClick={() => dispatch(createProject({"name": "new project"}))}>ps</button> */}
                <Switch>
                    <Route path='/bankAccounts/:accountId' render={({ match, history }) => <BankAccountPage history={ history } accounts={props.bankAccounts.filter(item => +item.id === +match.params.accountId) }/>} />
                    <Route path='/bankAccounts' render={() => <BankAccounts accounts={ props.bankAccounts }/>} /> 
                    <Route path='/transactions' render={() => <Transactions />} />
                    <Route path='/statistics' render={() => <StatisticsContainer />} />
                    <Route path='/transfer' render={() => <Transfer />} />
                    <Route path='/settings' render={() => <SettingsContainer />} />
                    <Route path='/profile' render={() => <Profile />} /> 
                    <Route path='/' render={() => <MainContent />} />
                </Switch>
            </div>
        </section>
    )
}

const mstp = (state) => ({
    bankAccounts: state.bankAccountsReducer.bankAccounts,
    isAuth: state.profileReducer.isAuth,
})

export default connect(mstp)(Main)