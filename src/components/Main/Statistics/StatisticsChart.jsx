import React from 'react'
import { Doughnut } from 'react-chartjs-2'

const StatisticsChart = (props) => {

    const doughnutData = {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [
                '#32b482',
                '#36A2EB',
                '#FFCE56',
                '#3f6355',
                '#5372da',
                '#da53d3',
                '#da5353',
                '#836d6d',
                '#5ac4be',
                '#1c2c2b',
                '#5e83c7',
                '#7a7801',
            ]
        }]
    }    
    // TODO Разделить табы на доходы расходы и нормализовать показ селекта по доходам/расходам при операциях
    if (props.statisticsTab === 1) { 
        props.projectsStat.forEach(item => {
            doughnutData.labels.push(item.name)
            if (props.isDigit === 2) {
                doughnutData.datasets[0].data.push(item.income)
            } else if (props.isDigit === 3) {
                doughnutData.datasets[0].data.push(item.expense)
            } else {
                // doughnutData.datasets[0].data.push(item.quantity)
            }
        });
    } else if (props.statisticsTab === 2 || props.statisticsTab === 3){ 
    // TODO made operations charts after getting data from backend
        props.operationsStat.forEach(item => {
            doughnutData.labels.push(item.name)
            if (props.isDigit === 2) {
                doughnutData.datasets[0].data.push(item.operationSum)
            } else if (props.isDigit === 3) {
                doughnutData.datasets[0].data.push(item.operationSum)
            } else {
                doughnutData.datasets[0].data.push(item.operationCount)
            }
        });
    }

     
    return <Doughnut data={doughnutData} />   
}

export default StatisticsChart