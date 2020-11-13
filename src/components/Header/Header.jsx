import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import logo from '../../assets/img/logo.svg' 
import { useSelector } from 'react-redux' 
import NewOperationModal from '../Header/NewOperationModal'
import addBtn from '../../assets/img/icons/add.svg'

const Header = () => {
    const isAuth = useSelector(state => state.profileReducer.isAuth)

    const [isModalOpen, toggleModal] = useState(false)
    const escFunction = (e) => {
        if (e.keyCode === 27) {
            toggleModal(false)
        }
    }
    useEffect(() => {
        document.addEventListener("keydown", escFunction, false)
    })

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
                { isAuth && <div className={styles.newOperationBlock}> 
                    <img src={addBtn} className={styles.newOperationIcon} onClick={() => toggleModal(true)} alt='+' /> 
                    <button className={styles.newOperationButton + ' button'} onClick={() => toggleModal(true)}>
                        Создать транзакцию
                    </button>
                </div>}
                


                {
                    isModalOpen && <NewOperationModal closeModal={() => toggleModal(false)} />
                } 
            </div> 
        </header>
    )
}

export default Header