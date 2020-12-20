const initialState = {
    contragents: []
}

const contragentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CONTRAGENTS':
            return {
                ...state,
                contragents: [...action.contragents]
            } 
        case 'ADD_CONTRAGENT':
            return {
                ...state,
                contragents: [...state.contragents, action.contragent]
            }
        case 'EDIT_CONTRAGENT':
            return {
                ...state,
                contragents: state.contragents.map(item => item.id === action.contragent.id ? action.contragent : item)
            }
        case 'REMOVE_CONTRAGENT':
            return {
                ...state,
                contragents: state.contragents.filter(item => item.id !== action.contragentId)
            }
        default:
            return state
    }
}

export default contragentsReducer