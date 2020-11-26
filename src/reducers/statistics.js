let initialState = {
    projects: [],
    operations: [],
    statisticsFetching: false
}

const statisticsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_STATISTICS': {
            return {
                ...state,
                projects: action.projectStatistics,
                operations: action.operationStatistics,
            }
        }
        case 'STATISTICS_FETCHING': { 
            return {
                ...state,
                statisticsFetching: action.statisticsFetching
            }
        }
        default:
            return state;
    }

}

export default statisticsReducer