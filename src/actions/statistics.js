import { statisticsApi } from "../api/api"

export const setStatistics = (projectStatistics, operationStatistics) => ({
    type: 'SET_STATISTICS',
    projectStatistics,
    operationStatistics
}) 
export const statisticsFetching = (statisticsFetching) => ({
    type: 'STATISTICS_FETCHING',
    statisticsFetching
})

export const getStatistics = () => (dispatch) => {
    try { 
        dispatch(statisticsFetching(true))
        Promise.all([statisticsApi.getProjectStatistics(), statisticsApi.getOperationStatistics()]) 
            .then(res => {   
                dispatch(setStatistics(res[0].data, res[1].data))
                dispatch(statisticsFetching(false))
            })
            .catch(e => {
                console.log(e)
                getStatistics()
            })
    } catch (e) {
        console.log(e)
        getStatistics()
    }
}