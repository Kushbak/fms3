import React, { useState, useEffect }  from 'react' 
import styles from './Transactions.module.css'  
import { connect } from 'react-redux'
import { requestTransactions } from '../../../actions/transactions'
import Preloader from '../../common/Preloader/Preloader'
import Paginator from '../../common/Paginator/Paginator'


const Transactions = (props) => {
    
    const [categoryId, setCategoryId] = useState(0)  

    const onChangeCurrentPage = (pageNumber) => {
        props.requestTransactions(pageNumber, props.pagesSize)
    }

    useEffect(() => {
        props.requestTransactions(props.currentPage, props.pagesSize)
    }, [])
    return (
        <div className={ styles.transactions }>

            <div className={ styles.tabsBlock }>
                <div className={ styles.tabs }>
                    <button className={ (categoryId === 0) ? styles.activeTab : undefined } onClick={ () => setCategoryId(0) }>Все</button>
                    <button className={ (categoryId === 1) ? styles.activeTab : undefined } onClick={ () => setCategoryId(1) }>Neobis Clubs</button>
                    <button className={ (categoryId === 2) ? styles.activeTab : undefined } onClick={ () => setCategoryId(2) }>Neolabs</button>
                    <button className={ (categoryId === 3) ? styles.activeTab : undefined } onClick={ () => setCategoryId(3) }>Neobis Studio</button>
                </div>
                <div className={ styles.setup }>
                    <button className="button">Экспортировать</button>
                    <input type='date'/>
                    <button className="button">Фильтр</button>
                </div>
            </div>

            <div className={styles.transactionsBlock}> 
                { props.transactionsFetching && <Preloader />}
                <Paginator 
                    currentPage={2} 
                    onChangeCurrentPage={onChangeCurrentPage} 
                    totalUsersCount={300} 
                    pagesSize={5}  
                />
                <div className={[styles.transactionItem, styles.transactionsTitle].join(' ')}>
                    <p className={styles.date}>Дата</p>
                    <p className={styles.type}>Тип</p>
                    <p className={styles.amount}>Сумма</p>
                    <p className={styles.account}>Счет</p>
                    <p className={styles.contragent}>Контрагент</p>
                    <p className={styles.category}>Категория</p>
                    <p className={styles.project}>Проект</p>
                </div>
                { props.transactions
                    .filter(item => (categoryId === 0 && item) 
                        || (categoryId === 1 && item.projectName === 'Neobis club') 
                        || (categoryId === 2 && item.projectName === 'Neolabs') 
                        || (categoryId === 3 && item.projectName === 'Neobis Studio')
                    )
                    .map(item => {
                        let date = new Date(item.transactionDate)
                        date.setHours(date.getHours() + 6)
                        let currentDate = new Date(date).toLocaleString().slice(0, 17)
                        return (
                            <div className={styles.transactionItem} key={item.id}> 
                                <p className={styles.date}>{currentDate}</p>
                                <p className={styles.type}>{item.transactionType}</p>
                                <p className={styles.amount}>{item.sum}</p>
                                <p className={styles.account}>{item.score}</p>
                                <p className={styles.contragent}>{item.counterPartyName}</p>
                                <p className={styles.category}>{item.operationName}</p>
                                <p className={styles.project}>{item.projectName}</p>
                            </div>
                        )} 
                    )
                }
            </div>
        </div>
    )
}

const mstp = (state) => ({
    transactions: state.transactionsReducer.transactions,
    transactionsFetching: state.transactionsReducer.transactionsFetching,
    pagesSize: state.transactionsReducer.pagesSize,
    currentPage: state.transactionsReducer.currentPage,
})

export default connect(mstp, { requestTransactions })(Transactions) 