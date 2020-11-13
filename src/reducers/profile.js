const initialState = { 
    userData: null,
    isFetching: false,
    isPosting: false,
    isAuth: false
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTH_USER_DATA': {
            return {
                ...state,
                userData: { ...action.userData },
                isAuth: action.isAuth
            }
        } 
        case 'SET_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching }
        }
        case 'SET_IS_POSTING': {
            return { ...state, isPosting: action.isPosting }
        } 
        default:
            return state
    }

}
export default profileReducer