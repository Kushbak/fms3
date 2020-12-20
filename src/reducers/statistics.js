let initialState = {
    statisticsData: [],
    statisticsFetching: false
}

const statisticsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_STATISTICS': {
            return {
                ...state,
                statisticsData: action.statisticsData,
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