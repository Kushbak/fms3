import { statisticsApi } from "../api/api"
import { setProjects } from "./projects"
import { setBankAccountsIndex } from "./bankAccounts"
import { setContragents } from "./contragents"

export const setStatistics = (statisticsData) => ({
    type: 'SET_STATISTICS',
    statisticsData
})
export const statisticsFetching = (statisticsFetching) => ({
    type: 'STATISTICS_FETCHING',
    statisticsFetching
})

// ! For request specific data of statistics 
// export const getStatistics = (filterValue) => (dispatch) => {
//     try {
//         dispatch(statisticsFetching(true))
//         Promise.all([statisticsApi.getProjectStatistics(), statisticsApi.getOperationStatistics()])
//             .then(res => {
//                 dispatch(setStatistics(res[0].data, res[1].data))
//                 dispatch(statisticsFetching(false))
//             })
//             .catch(e => {
//                 console.log(e)
//             })
//     } catch (e) {
//         console.log(e)
//     }
// }

// ! Get all data of statistics 
export const getStatistics = (filterValue) => (dispatch) => {
    try {
        dispatch(statisticsFetching(true))
        statisticsApi.getStatistics(filterValue)
            .then(res => {
                dispatch(setStatistics(res.data))
                dispatch(statisticsFetching(false))
            })
            .catch(e => {
                console.log(e)
                dispatch(statisticsFetching(false))
            })
    } catch (e) {
        console.log(e)
        dispatch(statisticsFetching(false))
    }
}

export const getSettingsList = () => (dispatch) => {
    try {
        statisticsApi.getSettings()
            .then(res => {
                dispatch(setProjects(res.data.projects))
                dispatch(setContragents(res.data.counterParties))
                dispatch(setBankAccountsIndex(res.data.scores))
            })
            .catch(e => {
                console.log(e)
            })
    } catch (e) {
        console.log(e)
    }
}
