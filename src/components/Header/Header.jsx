import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import logo from '../../assets/img/logo.svg'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { purple } from '@material-ui/core/colors'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import InvestmentIcon from '../../../src/assets/img/wallet.svg'
import GreenButton from '../common/GreenButton/GreenButton'
import { Button, SwipeableDrawer, useMediaQuery } from '@material-ui/core'
import Sidebar from '../Sidebar/Sidebar'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
    '&:hover': {
        backgroundColor: purple[900],
    },
    button: {
        backgroundColor: '#f8f8f8',
        boxShadow: 'none',
        borderColor: '#349e76',
        '&:hover': {
            backgroundColor: 'rgba(50, 180, 130, .2)',
            borderColor: 'rgba(50, 180, 130, .2)',
            boxShadow: '0 0 0 0.2rem rgba(50, 180, 130, .2)',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(50, 180, 130, .2)',
        },
        '& .MuiButton-label': {
            color: '#32b482',
        }
    }
}))

const Header = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    const isAuth = useSelector(state => state.profileReducer.isAuth) 

    const smSize = useMediaQuery('(max-width:768px)')
    const mdSize = useMediaQuery('(max-width:1024px)')
    
    const toggleDrawer = (event, state) => {
        if (!mdSize) return
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }
        setSidebarOpen(state)
    }

    const classes = useStyles()

    return (
        <header className={styles.header}>
            <div className={styles.headerBlock}>
                <Button className={styles.burgerBtn} onClick={(e) => toggleDrawer(e, true)}>
                    <MenuIcon style={{ fill: '#32b482' }}/>
                </Button>

                <img src={InvestmentIcon} className={styles.iconHeader} />
                <p className={styles.title}>Finance System</p>

                <NavLink className={styles.logo} to='/'>
                    <img src={logo} alt="logo" />
                </NavLink>

                {isAuth
                    ? <NavLink className={styles.authorization} to='/profile'>
                        <GreenButton 
                            variant="contained"
                            startIcon={<AccountCircleOutlinedIcon style={{ fill: '#32b482', backgroundColor: 'none' }} />}
                            className={classes.button}
                        >
                            {!smSize && 'Личный кабинет'}
                        </GreenButton>
                    </NavLink>
                    : <NavLink className={styles.authorization} to='/authorization'>Авторизация</NavLink>
                }

                <SwipeableDrawer
                    anchor='left'
                    open={isSidebarOpen}
                    onClose={(e) => toggleDrawer(e, false)}
                    onOpen={(e) => toggleDrawer(e, true)}
                >
                    <Sidebar toggleDrawer={toggleDrawer}/>
                </SwipeableDrawer>

            </div>
        </header>
    )
}

export default Header