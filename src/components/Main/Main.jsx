import React, { useEffect } from 'react' 
import { Redirect } from 'react-router-dom'
import styles from './Main.module.css'
import { Route, Switch } from 'react-router-dom'
import BankAccounts from './BankAccounts/BankAccounts' 
import Sidebar from '../Sidebar/Sidebar' 
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
import { getStatistics } from '../../actions/statistics'
import EditTransaction from '../EditTransaction/EditTransaction'
import FilterModal from '../common/FilterModal/FilterModal'

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
            dispatch(getStatistics())
        }, 300);
    }, [])
    if (!props.isAuth) {
        return <Redirect to='/authorization' />
    }  
    return (
        <section className={ styles.mainPage }> 
            <Sidebar /> 
            <div className={ styles.mainContent }> 
                <Switch>
                    <Route path='/bankAccounts/:accountId' render={({ match, history }) => <BankAccountPage history={ history } accounts={props.bankAccounts.filter(item => +item.id === +match.params.accountId) }/>} />
                    <Route path='/bankAccounts' render={() => <BankAccounts accounts={ props.bankAccounts }/>} /> 
                    <Route path='/statistics' render={() => <StatisticsContainer />} /> 
                    <Route path='/settings' render={() => <SettingsContainer />} />
                    <Route path='/profile' render={() => <Profile />} />  
                    <Route path='/' render={() => <Transactions />} />
                    {/* <Route path='/' render={() => <FilterModal />} /> */}
                </Switch>
            </div>

            {props.isModalOpen && <EditTransaction />}
        </section>
    )
}

const mstp = (state) => ({
    bankAccounts: state.bankAccountsReducer.bankAccounts,
    isAuth: state.profileReducer.isAuth,
    isModalOpen: state.transactionsReducer.isModalOpen,
})

export default connect(mstp)(Main)