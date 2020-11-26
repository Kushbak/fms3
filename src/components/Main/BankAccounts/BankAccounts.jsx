import React from 'react' 
import { NavLink } from 'react-router-dom'
import styles from './BankAccounts.module.css'
import Preloader from '../../common/Preloader/Preloader' 

const BankAccounts = (props) => {    
    if (!props.accounts[0]?.name) return <Preloader />
    return(
        <div className={styles.bankAccounts }>
            { props.accounts.map(item => (
                <NavLink to={`/bankAccounts/${item.id}`} className={ styles.account } key={ item.id }>
                    <p className={ styles.title }>{ item.name }</p> 
                    <p className={styles.balance}>{ item.sum } сом</p>
                </NavLink>
            )) }
        </div>
    )
}

export default BankAccounts