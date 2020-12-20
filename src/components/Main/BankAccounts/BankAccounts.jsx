import React from 'react'
import { NavLink } from 'react-router-dom'
import Preloader from '../../common/Preloader/Preloader'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import card from '../../../assets/img/card3.svg'
import Savings from '../../../assets/img/Savings.svg'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBankAccounts } from '../../../actions/bankAccounts'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        fontWeight: 500,
        fontSize: '18px',
        display: 'flex',
        alignContent: 'center',

    },
    ikoncard: {
        maxWidth: '150px',
        width: '50%',
        maxHeight: '60px',

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
                <NavLink to={`/bankAccounts/${item.id}`} key={item.id}>
                    <Grid container justify="center" spacing={3}>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}><img className={classes.ikoncard} src={card} />{item.name}</Paper>
                        </Grid>
                        <Grid item xs={3} spacing={3}>
                            <Paper className={classes.paper}><img className={classes.ikoncard} src={Savings} />{item.balance} сом</Paper>
                        </Grid>
                    </Grid>
                </NavLink>
            ))}
        </div>
    )
}



export default BankAccounts