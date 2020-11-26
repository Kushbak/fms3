import React, { useEffect }  from 'react' 
import styles from './Transactions.module.css'  
import { connect } from 'react-redux'
import { getAllTransactions, setEditedTransaction, openEditModal } from '../../../actions/transactions'
import Preloader from '../../common/Preloader/Preloader'
import Paginator from '../../common/Paginator/Paginator' 
import infoIcon from '../../../assets/img/icons/info.svg';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

const Transactions = (props) => {  
    const onChangeCurrentPage = (pageNumber) => {
        props.getAllTransactions(pageNumber, props.pagesSize)
    }

    useEffect(() => {
        props.getAllTransactions(props.pageNumber, props.pageSize)
    }, [])
    return (
        <div className={ styles.transactions }>

            <div className={ styles.tabsBlock }> 
                <div className=""></div>
                <div className={ styles.setup }>
                    <button className="button">Экспортировать</button> 
                    <button className="button">Фильтр</button>
                </div>
            </div>

            <div className={styles.transactionsBlock}>  
                <Paginator 
                    currentPage={props.pageNumber} 
                    onChangeCurrentPage={onChangeCurrentPage} 
                    totalUsersCount={props.totalRecords} 
                    pagesSize={props.pageSize}  
                />
                <div className={[styles.transactionItem, styles.transactionsTitle].join(' ')}>
                    <p className={styles.date}>Дата</p>
                    <p className={styles.type}>Тип</p>
                    <p className={styles.sum}>Сумма</p>
                    <p className={styles.account}>Счет</p>
                    <p className={styles.contragent}>Контрагент</p>
                    <p className={styles.category}>Категория</p>
                    <p className={styles.project}>Проект</p>
                    <p className={styles.description}>Описание</p>
                </div> 
                {props.transactionsFetching
                    ? <Preloader /> 
                    : props.transactions 
                        .map(item => {
                            let date = new Date(item.actionDate)
                            // date.setHours(date.getHours() + 6)
                            let currentDate = new Date(date).toLocaleString().slice(0, 10) 
                            return (
                                <div className={styles.transactionItem} key={item.id} onClick={() => { props.setEditedTransaction(item); props.openEditModal(true)}}> 
                                    <p className={styles.date}>{currentDate}</p>
                                    <p className={styles.type}>{item.transactionType}</p>
                                    <p className={styles.sum}>{item.sum}</p>
                                    <p className={styles.account}>{item.score}</p>
                                    <p className={styles.contragent}>{item.targetEntity}</p>
                                    <p className={styles.category}>{item.operationName}</p>
                                    <p className={styles.project}>{item.projectName}</p>
                                    <Tooltip className={styles.tooltipWrap} html={<p className={styles.descr}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, reiciendis?</p>}>
                                        <img className={styles.infoIcon} src={infoIcon} alt="info" />
                                    </Tooltip>
                                </div>
                            )} 
                        )
                }

                <Paginator
                    currentPage={props.pageNumber}
                    onChangeCurrentPage={onChangeCurrentPage}
                    totalUsersCount={props.totalRecords}
                    pagesSize={props.pageSize}
                />
            </div>
        </div>
    )
}

const mstp = (state) => ({
    transactions: state.transactionsReducer.data,
    transactionsFetching: state.transactionsReducer.transactionsFetching,
    pageSize: state.transactionsReducer.pageSize,
    pageNumber: state.transactionsReducer.pageNumber,
    totalRecords: state.transactionsReducer.totalRecords, 
})

export default connect(mstp, { getAllTransactions, setEditedTransaction, openEditModal })(Transactions) 