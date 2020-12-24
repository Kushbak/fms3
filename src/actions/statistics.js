import { statisticsApi } from "../api/api"
import { setProjects } from "./projects"
import { setBankAccountsIndex } from "./bankAccounts"
import { setContragents } from "./contragents"
import { DisplayPostMsg } from "./transactions"

export const setStatistics = (statisticsData) => ({
    type: 'SET_STATISTICS',
    statisticsData
})
export const statisticsFetching = (statisticsFetching) => ({
    type: 'STATISTICS_FETCHING',
    statisticsFetching
})

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
                dispatch(DisplayPostMsg([e?.response?.message || 'Непредвиденная ошибка при получении данных. Попробуйте чуть позже', false]))
            })
    } catch (e) {
        console.log(e)
        dispatch(statisticsFetching(false))
        dispatch(DisplayPostMsg(['Непредвиденная ошибка при получении данных. Попробуйте чуть позже', false]))
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
                dispatch(DisplayPostMsg([e?.response?.message || 'Непредвиденная ошибка при получении данных. Попробуйте чуть позже', false]))
                console.log(e)
            })
    } catch (e) {
        console.log(e)
    }
}
