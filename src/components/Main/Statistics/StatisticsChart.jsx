import React from 'react'
import { Doughnut, Line } from 'react-chartjs-2'
import styles from './Statistics.module.css'

const StatisticsChart = (props) => {
    const colors = [
        'rgba(251, 93, 66',
        'rgba(170, 85, 177',
        'rgba(153, 174, 54',
        'rgba(117, 15, 54',
        'rgba(44, 49, 163',
        'rgba(111, 195, 177',
        'rgba(63, 176, 76',
        'rgba(134, 16, 252',
        'rgba(133, 77, 161',
        'rgba(69, 1, 132',
        'rgba(114, 105, 177',
        'rgba(232, 71, 62',
        'rgba(16, 228, 199',
        'rgba(71, 106, 67',
        'rgba(98, 208, 32',
        'rgba(145, 224, 208',
        'rgba(182, 117, 57',
        'rgba(15, 76, 250',
        'rgba(202, 27, 154',
        'rgba(140, 8, 252',
        'rgba(59, 94, 176',
        'rgba(179, 240, 234',
        'rgba(62, 161, 223',
        'rgba(2, 96, 239',
        'rgba(146, 251, 139',
        'rgba(235, 73, 217',
        'rgba(58, 223, 252',
        'rgba(55, 117, 212',
        'rgba(230, 195, 207',
        'rgba(173, 35, 193',
        'rgba(12, 201, 195',
        'rgba(238, 54, 167',
        'rgba(112, 77, 139',
        'rgba(131, 62, 234',
        'rgba(166, 202, 122',
        'rgba(132, 212, 0',
        'rgba(187, 95, 147',
        'rgba(196, 164, 48',
        'rgba(84, 103, 132',
        'rgba(76, 86, 49',
        'rgba(64, 33, 85',
        'rgba(155, 134, 205',
        'rgba(17, 150, 108',
        'rgba(57, 125, 172',
        'rgba(50, 81, 101',
        'rgba(137, 80, 149',
        'rgba(182, 171, 172',
        'rgba(99, 219, 208',
        'rgba(218, 22, 59',
        'rgba(28, 235, 70',
        'rgba(123, 5, 139',
        'rgba(46, 97, 200',
        'rgba(66, 12, 9',
        'rgba(53, 76, 187',
        'rgba(145, 67, 187',
        'rgba(155, 48, 18',
        'rgba(28, 86, 171',
        'rgba(19, 148, 144',
        'rgba(192, 224, 93',
        'rgba(33, 78, 139',
        'rgba(29, 77, 130',
        'rgba(77, 227, 29',
        'rgba(29, 61, 132',
        'rgba(84, 223, 137',
        'rgba(181, 231, 129',
        'rgba(74, 139, 138',
        'rgba(31, 3, 46',
        'rgba(84, 143, 235',
        'rgba(193, 226, 129',
        'rgba(6, 223, 54',
        'rgba(45, 178, 21',
        'rgba(171, 145, 239',
        'rgba(19, 69, 138',
        'rgba(152, 35, 7',
        'rgba(138, 219, 123',
        'rgba(203, 110, 141',
        'rgba(203, 58, 92',
        'rgba(176, 228, 135',
        'rgba(146, 142, 255'
    ]
    const dataDoughnut = {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: colors.map(item => item + ')')
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
        if (doughnutDataLabel[item[props.filterStat]]) {
            doughnutDataLabel[item[props.filterStat]] += item.sum
            lineDataLabel[item[props.filterStat]].push(item.sum)
        } else {
            doughnutDataLabel[item[props.filterStat]] = item.sum
            lineDataLabel[item[props.filterStat]] = [item.sum]
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
    }

    // For Line
    for (let item in lineDataLabel) {
        const dataOfLine = {
            label: item,
            data: lineDataLabel[item],
            fill: false,
        }
        dataLine.datasets.push(dataOfLine)
    }
    dataLine.datasets.forEach((item, i) => {
        item.backgroundColor = colors[i]
        item.borderColor = colors[i]
    })

    for (let item in dateLabels) {
        dataLine.labels.push(item)
    }
    return (
        <div className={styles.chartsBlock}>
            <div className={styles.chartItem}>
                <Doughnut data={dataDoughnut} />
            </div>
            <div className={styles.chartItem}>
                <Line data={dataLine} options={options} />
            </div>
        </div>
    )
}

export default StatisticsChart