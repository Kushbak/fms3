import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import logo from '../../assets/img/logo.svg' 
import { useSelector } from 'react-redux'

const Header = () => {
    const isAuth = useSelector(state => state.profileReducer.isAuth)
    

    return (
        <header className={ styles.header }>
            <div className={ styles.headerBlock + ' wrapper'}>    
                <p></p>
                <NavLink className={ styles.logo } to='/'>
                    <img src={ logo } alt="logo"/>    
                </NavLink>  

                {isAuth
                    ? <NavLink className={styles.authorization} to='/profile'>Личный кабинет</NavLink>   
                    : <NavLink className={styles.authorization} to='/authorization'>Авторизация</NavLink>
                }  
            </div> 
        </header>
    )
}

export default Header