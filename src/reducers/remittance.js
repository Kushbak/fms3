let initialState = {
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0,
    data: [],
    isRemittancesFetching: false,
    remittanceCreating: false,
    remittanceCreated: false,
}

const remittanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_REMITTANCES':
            return {
                ...state,
                ...action.remittances
            }
        case 'POST_REMITTANCE':
            return {
                ...state,
                data: [...state.data, action.remittanceData]
            }
        case 'SET_REMITTANCE_FETCHING': 
            return {
                ...state,
                isRemittancesFetching: action.isRemittancesFetching
            }
        case 'REMITTANCE_CREATING':
            return {
                ...state,
                remittanceCreating: action.remittanceCreating,
                remittanceCreated: false,
            }
        case 'REMITTANCE_CREATED':
            return {
                ...state,
                remittanceCreating: false,
                remittanceCreated: action.remittanceCreated,
            }
        default:
            return state
    }
}

export default remittanceReducer