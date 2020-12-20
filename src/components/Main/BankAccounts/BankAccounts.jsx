import React from 'react'
import Preloader from '../../common/Preloader/Preloader'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBankAccounts } from '../../../actions/bankAccounts'

const useStyles = makeStyles((theme) => ({
    bankAccounts: {
        width: '70%',
        margin: '0 auto'
    },
    paper: {
        padding: '20px',
        textAlign: 'center',
        fontWeight: 500,
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px'
    },
}))

const BankAccounts = () => {
    const classes = useStyles()
    const bankAccounts = useSelector(state => state.bankAccountsReducer.bankAccountsIndex)
    const dispatch = useDispatch() 

    useEffect(() => {
        dispatch(getBankAccounts())
    }, [])
    
    if (!bankAccounts.length) return <Preloader />
    return (
        <div className={classes.bankAccounts}>
            {bankAccounts.map(item => (
                <Paper className={classes.paper} key={item.id}>
                    <p>{item.name}</p>
                    <p>{item.balance} сом</p>    
                </Paper>
            ))}
        </div>
    )
}



export default BankAccounts