import React from 'react'
import styles from './BankAccountPage.module.css'
import Preloader from '../../../common/Preloader/Preloader'
// import transactionsReducer from '../../../../reducers/transactions'

const BankAccountPage = (props) => {
    // const [transactions, dispatch] = useReducer(transactionsReducer) 
    if (!props.accounts.length) return <Preloader />
    return (
        <div className={styles.bankAccountPage}>
            <div className={styles.bankAccounPageBalance}>
                <p className={styles.cardName}>{props.accounts[0].name}</p>
                <p>
                    <span>Текущий баланс</span>
                    {props.accounts[0].sum}
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
            <div className={styles.transactionsHistory}>
                <div className={styles.bankAccountPageNav}>
                    <input type='date' />
                    <button className="button">Фильтр</button>
                </div>
                <h3>История транзакции</h3>
                <div className={styles.transactionsHistoryNav}>
                    <div className={[styles.transactionsHistoryItem, styles.transactionsHistoryTitle].join(' ')}>
                        <p className={styles.date}>Дата</p>
                        <p className={styles.type}>Тип</p>
                        <p className={styles.amount}>Сумма</p>
                        <p className={styles.account}>Счет</p>
                        <p className={styles.contragent}>Контрагент</p>
                        <p className={styles.category}>Категория</p>
                        <p className={styles.project}>Проект</p>
                    </div> 
                </div> 
            </div>
            <button onClick={props.history.goBack}> {'Назад'} </button> 
        </div>
    )
}

export default BankAccountPage