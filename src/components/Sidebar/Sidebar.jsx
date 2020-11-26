import React, { useState, useEffect } from 'react'
import styles from './Sidebar.module.css'
import { NavLink } from 'react-router-dom' 
import CreateTransactionModal from '../CreateTransaction/CreateTransactionModal'
import { useSelector } from 'react-redux'

const Sidebar = (props) => {
    const isAuth = useSelector(state => state.profileReducer.isAuth)

    const [isModalOpen, toggleModal] = useState(false)
    return (
        <>
            <div className={styles.sidebar}> 
                <button onClick={() => toggleModal(true)}>Создать транзакцию</button>
                <NavLink activeClassName={styles.activeLink} to='/bankAccounts'>Счета</NavLink> 
                <NavLink activeClassName={styles.activeLink} to='/statistics'>Статистика</NavLink>
                <NavLink activeClassName={styles.activeLink} to='/settings'>Настройки</NavLink>
            </div>

            {
                isModalOpen && <CreateTransactionModal closeModal={() => toggleModal(false)} />
            }
        </>
    )
}

export default Sidebar