import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import styles from './Main.module.css'
import { Route, Switch } from 'react-router-dom'
import BankAccounts from './BankAccounts/BankAccounts'
import Sidebar from '../Sidebar/Sidebar'
import BankAccountPage from './BankAccounts/BankAccountPage/BankAccountPage'
import { connect } from 'react-redux'
import SettingsContainer from './Settings/SettingsContainer'
import ProfileContainer from './Profile/ProfileContainer'
import { getAllTransactions } from '../../actions/transactions'
import { getAllCategories } from '../../actions/categories'
import { getSettingsList } from '../../actions/statistics'
import TransactionsContainer from './TransactionsPage/TransactionsContainer'
import StatisticsContainer from './Statistics/StatisticsContainer'
import NotFound from '../404/NotFound'
import { useMediaQuery } from '@material-ui/core'
import { getBankAccounts } from '../../actions/bankAccounts'

const Main = (props) => {
    const TabletSize = useMediaQuery('(max-width:1024px)')
    useEffect(() => {
        props.getAllTransactions()
        props.getSettingsList()
        props.getAllCategories()
        setTimeout(() => {
            props.getBankAccounts()
        }, 1000)
    }, [])

    if (!props.isAuth) return <Redirect to='/authorization' />
    return (
        <section className={styles.mainPage}>
            {!TabletSize && <Sidebar />}
            <div className={styles.mainContent}>
                <Switch>
                    <Route path='/bankAccounts/:accountId' render={({ match, history }) => <BankAccountPage history={history} accounts={props.bankAccountDetails.filter(item => +item.id === +match.params.accountId)} />} />
                    <Route path='/bankAccounts' render={() => <BankAccounts />} />
                    <Route path='/statistics' render={() => <StatisticsContainer />} />
                    <Route path='/settings' render={() => <SettingsContainer />} />
                    <Route path='/profile' render={() => <ProfileContainer />} />
                    <Route path='/' render={() => <TransactionsContainer />} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </section>
    )
}

const mstp = (state) => ({
    bankAccountDetails: state.bankAccountsReducer.bankAccountDetails,
    isAuth: state.profileReducer.isAuth
})

export default connect(mstp, {
    getAllTransactions,
    getSettingsList,
    getAllCategories,
    getBankAccounts,
})(Main)