const initialState = { 
    projects: [], 
}

const projectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PROJECTS':
            return {
                ...state,
                projects: [...action.projects]
            }
        default:
            return state
    }
}

export default projectsReducer