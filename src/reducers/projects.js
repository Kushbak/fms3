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
        case 'EDIT_PROJECT': 
            return {
                ...state,
                projects: [...state.projects.map(item => item.id === action.project.id ? action.project : item)]
            }
        default:
            return state
    }
}

export default projectsReducer