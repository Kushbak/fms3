import React, { useState } from 'react'
import styles from './Statistics.module.css'    
import StatisticsChart from './StatisticsChart'
import { connect } from 'react-redux'
import Preloader from '../../common/Preloader/Preloader'

const Statistics = (props) => {
 
    const [chartType, setChartType] = useState(1) 
    const [statisticsTab, setTab] = useState(0) 
    const [isDigit, setDigit] = useState(1)

    let statisticsTabsArr = [] 
    for (let item in props.allReducers) {
        if(item !== 'categoriesFetching'){
            statisticsTabsArr.push(item);
        }
    }  
    
    if(props.transactionsFetching) return <Preloader />
    return (
        <div className={styles.statistics} > 
            <div className={styles.tabsBlock}> 
                <div className={ styles.selectsBlock }>
                    <select name="selectChart" onChange={(e) => setChartType(+e.target.value)} >
                        <option value="1">Круговая</option>
                        <option value="2">Гистограмма</option>
                        <option value="3">График</option>
                        <option value="4">Точечная</option>
                    </select>
                    <select name="selectType" onChange={(e) => setDigit(+e.target.value)} >
                        <option value='1'>По количеству</option>
                        <option value='2'>По доходам</option>
                        <option value='3'>По расходам</option> 
                    </select>
                </div>
                <div className={styles.setup}> 
                    <button className="button">Экспортировать</button>
                    <input type='date' />
                    <button className="button">Фильтр</button>
                </div>
            </div>
            <div className={ styles.statisticsBlock }>
                <div className={ styles.statisticsTabs }> 
                    {statisticsTabsArr.map((item, index) => ( 
                        <button key={item.id}
                            className={[styles.statisticsTab, index === statisticsTab && styles.activeStatisticsTab].join(' ')} 
                            onClick={() => setTab(index)} >
                                {
                                    (item === 'expenseCategories' && 'Расходы') 
                                    || (item === 'incomeCategories' && 'Доходы')
                                    || (item === 'projects' && 'Проекты') 
                                }
                        </button>
                    ))}
                </div>
                <div className={styles.statisticsCharts}> 
                    <StatisticsChart 
                        category={props.allReducers[statisticsTabsArr[statisticsTab]]} 
                        transactions={props.transactions}
                        statisticsTab={statisticsTabsArr[statisticsTab]} 
                        categories={props.allReducers}
                        isDigit={isDigit}
                    />
                </div>
            </div>
        </div>
    )
}

const mstp = (state) => ({
    transactions: state.transactionsReducer.transactions,
    transactionsFetching: state.transactionsReducer.transactionsFetching,
})

export default connect(mstp, {})(Statistics)