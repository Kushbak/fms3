import React, { useEffect, useState } from 'react'
import styles from './Sidebar.module.css'
import { NavLink } from 'react-router-dom'
import NewOperationModal from '../Header/NewOperationModal'

const Sidebar = (props) => {
    const [isModalOpen, toggleModal] = useState(false)
    const escFunction = (e) => {
        if (e.keyCode === 27) {
            toggleModal(false)
        }
    }
    useEffect(() => {
        document.addEventListener("keydown", escFunction, false)
    })
    return(
        <div className={ styles.sidebar }> 
            <button className={styles.newOperationButton} onClick={() => toggleModal(true)}> + </button>                
            <NavLink activeClassName={ styles.activeLink } to='/bankAccounts'>Счета</NavLink>
            <NavLink activeClassName={ styles.activeLink } to='/transfer'>Перевод</NavLink>
            <NavLink activeClassName={styles.activeLink} to='/transactions'>Транзакции</NavLink>
            <NavLink activeClassName={styles.activeLink} to='/statistics'>Статистика</NavLink>
            <NavLink activeClassName={styles.activeLink} to='/settings'>Настройки</NavLink> 

            {
                isModalOpen && <NewOperationModal closeModal={() => toggleModal(false)} />
            }
            
        </div>
    )
}

export default Sidebar