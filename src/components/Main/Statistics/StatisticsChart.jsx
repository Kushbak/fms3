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
    let filteredTransactionsToChart = {}
 
    // adding length of each operation 
    
    props.category.forEach(item => {
        filteredTransactionsToChart[item.name] = 0
    }) 
    
    if (props.isDigit === 1){
        props.transactions.forEach((transaction) => {
            if (props.statisticsTab === 'expenseCategories' || props.statisticsTab === 'incomeCategories') {
                filteredTransactionsToChart[transaction.operationName] += 1
            } else if (props.statisticsTab === 'bankAccounts') {
                filteredTransactionsToChart[transaction.score] += 1
            } else if (props.statisticsTab === 'projects') {
                filteredTransactionsToChart[transaction.projectName] += 1
            }
        })    
    } else if (props.isDigit === 2){ 
        props.transactions.filter(item => item.transactionType === 'Доход').forEach((transaction) => {
            if (props.statisticsTab === 'expenseCategories' || props.statisticsTab === 'incomeCategories') {
                filteredTransactionsToChart[transaction.operationName] += transaction.sum
            } else if (props.statisticsTab === 'bankAccounts') {
                filteredTransactionsToChart[transaction.score] += transaction.sum
            } else if (props.statisticsTab === 'projects') {
                filteredTransactionsToChart[transaction.projectName] += transaction.sum
            }
        })    
    } else { 
        props.transactions.filter(item => item.transactionType === 'Расход').forEach((transaction) => {
            if (props.statisticsTab === 'expenseCategories' || props.statisticsTab === 'incomeCategories') {
                filteredTransactionsToChart[transaction.operationName] += transaction.sum
            } else if (props.statisticsTab === 'bankAccounts') {
                filteredTransactionsToChart[transaction.score] += transaction.sum
            } else if (props.statisticsTab === 'projects') {
                filteredTransactionsToChart[transaction.projectName] += transaction.sum
            }
        })   
    }

    for (let item in filteredTransactionsToChart) {
        doughnutData.labels.push(item)
        doughnutData.datasets[0].data.push(filteredTransactionsToChart[item])
    } 
    return <Doughnut data={doughnutData} />   
}

export default StatisticsChart