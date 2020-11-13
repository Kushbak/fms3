import React from 'react'
import styles from '../Main.module.css' 
import { connect } from 'react-redux'
import Preloader from '../../common/Preloader/Preloader'


const MainContent = (props) => {     
    let income = {
        'Neobis club': 0,
        'Neolabs': 0,
        'Neobis Studio': 0,
        'Прочее': 0
    }
    let expense = {
        'Neobis club': 0,
        'Neolabs': 0,
        'Neobis Studio': 0,
        'Прочее': 0
    }  
    console.log(props.transactions.filter(item => item.projectName == 'Прочее'));
    if(props.transactionsFetching) return <Preloader />
    return (
        <div className={styles.mainDefaultPage}>
            {props.projects.map(item => (
                <div className={styles.projectCard} key={item.id}>
                    <p className={styles.projectName}>{item.name}</p>
                    <div className={styles.balance}>
                        { props.transactions.forEach(transaction => {
                            if (transaction.transactionType === 'Доход' && transaction.projectName === item.name) {
                                income[item.name] += +transaction.sum
                            } else if (transaction.transactionType === 'Расход' && transaction.projectName === item.name) { 
                                expense[item.name] += +transaction.sum
                            }
                        })}
                        <p className={ styles.balanceTitle }>
                            <span>Доход</span>
                            {income[item.name]} сом
                        </p>
                        <p className={ styles.balanceTitle }>
                            <span>Расход</span> 
                            {expense[item.name]} сом
                        </p>
                    </div>
                </div>
            ))} 
        </div>
    )
} 

const mstp = (state) => ({
    transactions: state.transactionsReducer.data,
    transactionsFetching: state.transactionsReducer.transactionsFetching,
    projects: state.projectsReducer.projects,
})

export default connect(mstp)(MainContent)