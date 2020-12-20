import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import styles from './Main.module.css'
import { Route, Switch } from 'react-router-dom'
import BankAccounts from './BankAccounts/BankAccounts'
import Sidebar from '../Sidebar/Sidebar'
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
import TostifyAlert from '../common/TostifyAlert/TostifyAlert'
import { DisplayPostMsg } from '../../actions/transactions' 

const Main = (props) => {
    const TabletSize = useMediaQuery('(max-width:1024px)')
    useEffect(() => {
        props.getAllTransactions()
        props.getSettingsList()
        setTimeout(() => {
            props.getAllCategories()
        }, 2000)
        setTimeout(() => {
            props.getBankAccounts()
        }, 5000)
    }, [])


    if (!props.isAuth) return <Redirect to='/authorization' />
    return (
        <section className={styles.mainPage}>
            {!TabletSize && <Sidebar />}
            <div className={styles.mainContent}>
                <Switch>
                    {props.role === 'admin' && <Route path='/settings' render={() => <SettingsContainer />} />}
                    <Route path='/bankAccounts' render={() => <BankAccounts />} />
                    <Route path='/statistics' render={() => <StatisticsContainer />} />
                    <Route path='/profile' render={() => <ProfileContainer />} />
                    <Route path='/' render={() => <TransactionsContainer />} />
                    <Route component={NotFound} />
                </Switch>
            </div>

            <TostifyAlert
                setMsg={props.DisplayPostMsg}
                displayedMsg={props.displayedMsg[0]}
                severity={props.displayedMsg[1] ? 'success' : 'error'}
            />
        </section>
    )
}

const mstp = (state) => ({
    bankAccountDetails: state.bankAccountsReducer.bankAccountDetails,
    isAuth: state.profileReducer.isAuth,
    displayedMsg: state.transactionsReducer.displayedMsg,
    role: state.profileReducer.role
})

export default connect(mstp, {
    getAllTransactions,
    getSettingsList,
    getAllCategories,
    getBankAccounts,
    DisplayPostMsg,
})(Main)