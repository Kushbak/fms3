import React from 'react' 
import { Doughnut, Line } from 'react-chartjs-2'
import styles from './Statistics.module.css'

const StatisticsChart = (props) => {

    const random_rgba = () => {
        let o = Math.round
        let r = Math.random 
        let s = 255
        return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s);
    }

    const dataDoughnut = {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: []
        }]
    }
    const dataLine = {
        labels: [],
        datasets: [],
    }    
    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                }
            ],
        },
    }

    
    const lineDataLabel = {}
    const doughnutDataLabel = {}
    const dateLabels = {}
    props.statisticsData.forEach(item => {
        if (doughnutDataLabel[item.operationName]){
            doughnutDataLabel[item.operationName] += item.sum
            lineDataLabel[item.operationName].push(item.sum)
        } else {
            doughnutDataLabel[item.operationName] = item.sum
            lineDataLabel[item.operationName] = [item.sum]
        }
        const formattedDate = new Date(item.actionDate).toLocaleDateString()
        if (!dateLabels[formattedDate]) {
            dateLabels[formattedDate] = 1
        }
    })

    // For Dougnut
    for (let item in doughnutDataLabel) {
        dataDoughnut.datasets[0].data.push(doughnutDataLabel[item])
        dataDoughnut.labels.push(item)
        dataDoughnut.datasets[0].backgroundColor.push(random_rgba() + ')')
    }

    // For Line
    for (let item in lineDataLabel) {
        const dataOfLine = {
            label: item,
            data: lineDataLabel[item],
            fill: false,
            backgroundColor: random_rgba() + ')',
            borderColor: random_rgba() + ', 0.2)',
        }
        dataLine.datasets.push(dataOfLine)
    }

    for (let item in dateLabels) {
        dataLine.labels.push(item)
    }
    return (
        <>
            <div className={styles.chartItem}>
                <Doughnut data={dataDoughnut} />   
            </div>
            <div className={styles.chartItem}>
                <Line data={dataLine} options={options} />
            </div> 
        </>
    )
}

export default StatisticsChart