import React from 'react'
import styles from './Sidebar.module.css'
import { NavLink } from 'react-router-dom'

const Sidebar = (props) => {
    return(
        <div className={ styles.sidebar }>              
            <NavLink activeClassName={ styles.activeLink } to='/bankAccounts'>Счета</NavLink>
            <NavLink activeClassName={ styles.activeLink } to='/transfer'>Перевод</NavLink>
            <NavLink activeClassName={styles.activeLink} to='/transactions'>Транзакции</NavLink>
            <NavLink activeClassName={styles.activeLink} to='/statistics'>Статистика</NavLink>
            <NavLink activeClassName={styles.activeLink} to='/settings'>Настройки</NavLink>  
        </div>
    )
}

export default Sidebar