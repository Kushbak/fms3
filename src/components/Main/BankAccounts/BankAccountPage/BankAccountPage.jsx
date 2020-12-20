import React from 'react'
import styles from './BankAccountPage.module.css'
import Preloader from '../../../common/Preloader/Preloader'
// import transactionsReducer from '../../../../reducers/transactions'
import GreenButton from '../../../common/GreenButton/GreenButton'

const BankAccountPage = (props) => {
    // const [transactions, dispatch] = useReducer(transactionsReducer) 
    if (!props.accounts.length) return <Preloader />
    return (
        <div className={styles.bankAccountPage}>
            <div className={styles.bankAccounPageBalance}>
                <p className={styles.cardName}>{props.accounts[0].name}</p>
                <p>
                    <span>Текущий баланс</span>
                    {props.accounts[0].balance}
                </p>
                <p>
                    <span>Потрачено</span>
                            0 сом
                        </p>
                <p>
                    <span>Получено</span>
                            0 сом
                        </p>
            </div>
            <button onClick={props.history.goBack}> {'Назад'} </button> 
        </div>
    )
}

export default BankAccountPage