import React from 'react'
import styles from './BankAccountPage.module.css'

const BankAccountPage = (props) => {  
    return (
        <div className={styles.bankAccountPage}>
              <div className={styles.bankAccountPageNav}>
                <div className={styles.cardName}>
                    <p>{ props.accounts[0].name }</p>
                </div>
                <div className={ styles.headerNav}>
                    <input type='date'/>
                    <button className="button">Фильтр</button>
                 </div>
             </div>
             <div className={styles.bankAccounPageBalance}>
                        <p>
                            <span>Текущий баланс</span>
                            123 сом
                        </p>
                        <p>
                            <span>Потрачено</span>
                            123 сом
                        </p>
                        <p>
                           <span>Получено</span>
                            123 сом
                        </p>
                    </div> 
                <div className= {styles.operationsHistory}>
                    <h3>История транзакции</h3>
                    <div className={styles.operationsHistoryNav}>
                       <div className={[styles.operationsHistoryItem, styles.operationsHistoryTitle].join(' ')}>
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
                   <button onClick={ props.history.goBack }> {'Назад'} </button>
        
       </div> 
    )
}

export default BankAccountPage