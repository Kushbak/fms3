import React from 'react' 
import { NavLink } from 'react-router-dom'
import styles from './BankAccounts.module.css' 

const BankAccounts = (props) => {
    return(
        <div className={styles.bankAccounts }>
            { props.accounts.map(item => (
                <NavLink to={`/bankAccounts/${item.id}`} className={ styles.account } key={ item.id }>
                    <p className={ styles.title }>{ item.name }</p>
                    <p className={ styles.code }>{ item.code }</p>
                    <p className={ styles.balance }>{ item.balance  }</p>
                </NavLink>
            )) }
        </div>
    )
}

export default BankAccounts