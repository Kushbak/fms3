import React, { useState } from 'react'
import styles from './Statistics.module.css'    
import StatisticsChart from './StatisticsChart' 
import Preloader from '../../common/Preloader/Preloader'

const Statistics = (props) => {
 
    const [chartType, setChartType] = useState(1) 
    const [statisticsTab, setTab] = useState(1) 
    const [isDigit, setDigit] = useState(2)

    let statisticsTabsArr = [] 
    for (let item in props.allReducers) {
        if(item !== 'categoriesFetching'){
            statisticsTabsArr.push(item);
        }
    }  
    
    if (props.statisticsFetching) return <Preloader />
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
                        <option value='2'>По доходам</option>
                        <option value='3'>По расходам</option> 
                        <option value='1'>По количеству</option>
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
                    <button
                        className={[styles.statisticsTab, statisticsTab === 1 && styles.activeStatisticsTab].join(' ')} 
                        onClick={() => setTab(1)} > 
                        Проекты
                    </button>
                    <button
                        className={[styles.statisticsTab, statisticsTab === 2 && styles.activeStatisticsTab].join(' ')}
                        onClick={() => setTab(2)} >
                        Операции 
                    </button> 
                </div>
                <div className={styles.statisticsCharts}> 
                    {+chartType === 1 && <StatisticsChart statisticsTab={statisticsTab} operationsStat={props.operationsStat} projectsStat={props.projectsStat} isDigit={isDigit} />}
                </div>
            </div>
        </div>
    )
} 

export default Statistics